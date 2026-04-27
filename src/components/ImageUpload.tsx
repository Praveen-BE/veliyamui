"use client";
import React, { useState, useRef, JSX } from "react";

export default function ImageUpload(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Allowed image types
  const allowedTypes: string[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  const handleFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only JPG, PNG, GIF, and WEBP images are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-primary p-4">
      <div
        className="max-w-sm p-6 border-2 border-dashed border-gray-400 rounded-lg bg-white text-center cursor-pointer hover:border-blue-500 transition"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleChange}
        />

        {file ? (
          <div>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="mx-auto max-h-48 rounded-md shadow-md"
            />
            <p className="mt-1 text-lg text-textPrimary font-semibold">
              {file.name}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-500">Drag & drop an image here</p>
            <p className="text-gray-400 text-sm">or click to choose a file</p>
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
