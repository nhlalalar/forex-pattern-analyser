"use client";

import { useCallback, useState } from "react";
import { Upload, ImageIcon, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelected: (file: File, previewUrl: string) => void;
  selectedFile: File | null;
  previewUrl: string | null;
  onClear: () => void;
}

export function UploadZone({ onFileSelected, selectedFile, previewUrl, onClear }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onFileSelected(file, url);
    },
    [onFileSelected]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (selectedFile && previewUrl) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 relative">
        <button
          onClick={onClear}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#1e2535] hover:bg-[#263040] flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#1e2535] flex-shrink-0 bg-[#0d1117]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Uploaded chart" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-emerald-400">Chart Ready</span>
            </div>
            <p className="text-xs text-slate-400 truncate">{selectedFile.name}</p>
            <p className="text-xs text-slate-600 mt-0.5">
              {(selectedFile.size / 1024).toFixed(0)} KB — {selectedFile.type.split("/")[1].toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <label
      className={cn(
        "upload-zone rounded-xl flex flex-col items-center justify-center gap-3 py-12 px-6 cursor-pointer relative",
        isDragging && "drag-over"
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onInputChange}
      />
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
          isDragging
            ? "bg-blue-600/20 border border-blue-500/40"
            : "bg-[#1a2030] border border-[#1e2535]"
        )}
      >
        {isDragging ? (
          <ImageIcon className="w-6 h-6 text-blue-400" />
        ) : (
          <Upload className="w-6 h-6 text-slate-500" />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-300">
          {isDragging ? "Drop your chart here" : "Drop chart or click to upload"}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          PNG, JPG, WEBP — Max 10 MB
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <div className="h-px w-12 bg-[#1e2535]" />
        supported formats
        <div className="h-px w-12 bg-[#1e2535]" />
      </div>
      <div className="flex gap-2">
        {["PNG", "JPG", "WEBP", "GIF"].map((fmt) => (
          <span key={fmt} className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1a2030] border border-[#1e2535] text-slate-500">
            {fmt}
          </span>
        ))}
      </div>
    </label>
  );
}
