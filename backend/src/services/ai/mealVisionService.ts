import { GoogleGenAI } from '@google/genai';
import type { MealAnalysisAPIResponse, AIFoodItem } from '../../types/meal.js';
import { calculateTotalsFromFoods, validateAIFoodItem } from '../nutrition/nutritionService.js';
import { AppError } from '../../middleware/errorHandler.js';

const SYSTEM_PROMPT = `You are a nutrition estimation assistant.

Analyze the uploaded meal image.

Identify each visible food item separately.

Estimate the edible portion size in grams.

Estimate calories, protein, carbohydrates, and fat.

Do not claim that the values are exact. Food photographs cannot reliably reveal exact ingredients, cooking oil, recipe, or portion weight.

Use reasonable nutritional estimates.

If a food cannot be identified confidently, clearly indicate lower confidence (between 0.0 and 1.0).

Return ONLY valid JSON matching the required schema. Do not output markdown or conversational text.

Schema:
{
  "foods": [
    {
      "name": "string",
      "estimatedWeightGrams": number,
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number,
      "confidence": number
    }
  ],
  "totals": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  }
}`;

const MOCK_RESPONSE: MealAnalysisAPIResponse = {
  foods: [
    {
      name: 'Chicken Curry',
      estimatedWeightGrams: 200,
      calories: 380,
      protein: 38,
      carbs: 8,
      fat: 20,
      confidence: 0.85,
    },
    {
      name: 'Cooked White Rice',
      estimatedWeightGrams: 250,
      calories: 325,
      protein: 6,
      carbs: 70,
      fat: 1,
      confidence: 0.9,
    },
    {
      name: 'Mixed Vegetable Sabzi',
      estimatedWeightGrams: 150,
      calories: 120,
      protein: 4,
      carbs: 18,
      fat: 4,
      confidence: 0.78,
    },
  ],
  totals: {
    calories: 825,
    protein: 48,
    carbs: 96,
    fat: 25,
  },
};

export async function analyzeMealWithAI(
  buffer: Buffer,
  mimeType: string
): Promise<MealAnalysisAPIResponse> {
  const useMock = process.env.USE_MOCK_AI === 'true' || !process.env.AI_API_KEY;

  if (useMock) {
    console.log('[AI Vision]: Using mock analysis data (USE_MOCK_AI=true or no AI_API_KEY provided)');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return MOCK_RESPONSE;
  }

  try {
    const apiKey = process.env.AI_API_KEY!;
    const modelName = process.env.AI_MODEL || 'gemini-2.5-flash';

    const ai = new GoogleGenAI({ apiKey });

    const imagePart = {
      inlineData: {
        data: buffer.toString('base64'),
        mimeType,
      },
    };

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [imagePart, SYSTEM_PROMPT],
    });

    const responseText = response.text;

    if (!responseText) {
      throw new AppError(500, 'ANALYSIS_FAILED', 'Empty response from AI vision service.');
    }

    // Clean JSON response (strip ```json blocks if present)
    const cleanedJson = responseText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsedData = JSON.parse(cleanedJson) as Partial<MealAnalysisAPIResponse>;

    if (!parsedData || !Array.isArray(parsedData.foods) || parsedData.foods.length === 0) {
      throw new AppError(500, 'ANALYSIS_FAILED', 'AI could not confidently identify food items.');
    }

    const validatedFoods: AIFoodItem[] = parsedData.foods
      .filter(validateAIFoodItem)
      .map((item) => ({
        name: String(item.name || 'Unknown Item'),
        estimatedWeightGrams: Math.max(Number(item.estimatedWeightGrams) || 100, 0),
        calories: Math.max(Math.round(Number(item.calories) || 0), 0),
        protein: Math.max(Math.round((Number(item.protein) || 0) * 10) / 10, 0),
        carbs: Math.max(Math.round((Number(item.carbs) || 0) * 10) / 10, 0),
        fat: Math.max(Math.round((Number(item.fat) || 0) * 10) / 10, 0),
        confidence: typeof item.confidence === 'number' ? item.confidence : 0.8,
      }));

    if (validatedFoods.length === 0) {
      throw new AppError(500, 'ANALYSIS_FAILED', 'No valid food items identified in the image.');
    }

    const totals = calculateTotalsFromFoods(validatedFoods);

    return {
      foods: validatedFoods,
      totals,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('[AI Provider Error]:', error instanceof Error ? error.message : error);
    throw new AppError(
      500,
      'ANALYSIS_FAILED',
      'Unable to analyze this meal. Please ensure the image is clear and contains food.'
    );
  }
}
