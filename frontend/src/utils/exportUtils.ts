export function downloadBlob(content: string, filename: string, mimeType: string = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportMealsToCSV(meals: Array<{ name: string; category: string; calories: number; protein: number; loggedAt: string }>) {
  const headers = ['Meal Name', 'Category', 'Calories (kcal)', 'Protein (g)', 'Time'];
  const rows = meals.map(m => [
    `"${m.name.replace(/"/g, '""')}"`,
    m.category,
    m.calories,
    m.protein,
    m.loggedAt
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadBlob(csvContent, `fitsnap-meals-${new Date().toISOString().split('T')[0]}.csv`);
}

export function exportJSON(data: object, filename: string = 'fitsnap-data.json') {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadBlob(jsonContent, filename, 'application/json');
}
