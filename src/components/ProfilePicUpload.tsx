"use client";
import React, { useState, useRef, JSX, useEffect } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProfilePicUploadProps {
  currentImgUrl: string | null;
  languageCode: string;
  onUploadSuccess?: (newUrl: string) => void;
}

export default function ProfilePicUpload({
  currentImgUrl,
  languageCode,
  onUploadSuccess,
}: ProfilePicUploadProps): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up Object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only JPG, PNG, GIF, and WEBP images are allowed.");
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // Matches your multer 5MB limit
      setError("File size must be less than 5MB.");
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setError("");
    setFile(selectedFile);
    // Create local object URL for instant visual preview
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language_code", languageCode); // Sent to body for database context

      const res = await fetch(`${API_URL}/images/profile-picture/localized`, {
        method: "PATCH", // Matches route method replacement rule
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong during upload");
      }

      // Sync backend URL to UI
      setPreviewUrl(data.url);
      setFile(null); // Clear input file reference since it's uploaded

      if (onUploadSuccess) {
        onUploadSuccess(data.url);
      }
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Determine what image asset to display dynamically
  const displayImageSrc = previewUrl || currentImgUrl;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className="relative group w-32 h-32 border-2 border-dashed border-gray-400 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-500 transition-all duration-200"
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

        {displayImageSrc ? (
          <div className="relative w-full h-full">
            <Image
              src={displayImageSrc}
              alt={`Profile avatar (${languageCode})`}
              fill
              sizes="128px"
              className="object-cover"
            />
            {/* Hover overlay text prompt */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <span className="text-white text-xs font-medium">
                Change Photo
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center select-none">
            <p className="text-gray-400 text-xs font-medium">Drag avatar</p>
            <p className="text-gray-400 text-[10px]">or click</p>
          </div>
        )}
      </div>

      {/* Language Indicator Badge */}
      <span className="mt-2 text-xs font-semibold uppercase bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
        Lang: {languageCode}
      </span>

      <button
        className="mt-4 w-32 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-3 py-1.5 rounded-md disabled:bg-gray-300 disabled:text-gray-500 transition shadow-sm"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Save Picture"}
      </button>

      {error && (
        <p className="mt-2 text-red-500 text-xs font-medium text-center max-w-50">
          {error}
        </p>
      )}
    </div>
  );
}
