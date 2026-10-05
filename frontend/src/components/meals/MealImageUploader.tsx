import React, { useRef, useEffect, useState } from 'react';
import { Camera, Image as ImageIcon, RefreshCw, X, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

interface MealImageUploaderProps {
  onImageSelected: (file: File, objectUrl: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  selectedImageUrl: string | null;
  selectedFile: File | null;
  error?: string | null;
}

export const MealImageUploader: React.FC<MealImageUploaderProps> = ({
  onImageSelected,
  onAnalyze,
  onClear,
  selectedImageUrl,
  error,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedImageUrl && selectedImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(selectedImageUrl);
      }
    };
  }, [selectedImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    const url = URL.createObjectURL(file);
    onImageSelected(file, url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-rose-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {selectedImageUrl ? (
        /* Image Preview State */
        <div className="space-y-4 animate-fade-in">
          <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 flex items-center justify-center group">
            <img
              src={selectedImageUrl}
              alt="Meal preview"
              className="w-full h-full object-cover object-center"
            />
            <button
              onClick={onClear}
              className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-md border border-zinc-700 transition-all active:scale-95"
              title="Remove photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="primary"
              size="xl"
              onClick={onAnalyze}
              className="w-full glow-yellow"
            >
              ✨ Analyze Meal
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<RefreshCw className="w-4 h-4 text-yellow-400" />}
              onClick={() => galleryInputRef.current?.click()}
              fullWidth
            >
              Choose another photo
            </Button>
          </div>
        </div>
      ) : (
        /* Image Picker Buttons & Drop Zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all ${
            dragOver
              ? 'border-yellow-400 bg-yellow-400/5'
              : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
          }`}
        >
          <div className="w-14 h-14 bg-yellow-400/10 text-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-yellow-400/20 shadow-md">
            <Camera className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-zinc-100">
            Select or Take Meal Photo
          </h3>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-1 mb-5">
            Take a photo of your plate or upload an existing image to automatically identify foods & macros.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <Button
              variant="primary"
              size="lg"
              icon={<Camera className="w-5 h-5" />}
              onClick={() => cameraInputRef.current?.click()}
              fullWidth
            >
              Take Photo
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<ImageIcon className="w-5 h-5 text-yellow-400" />}
              onClick={() => galleryInputRef.current?.click()}
              fullWidth
            >
              Choose Gallery
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
