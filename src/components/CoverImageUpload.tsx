"use client";
import Image from "next/image";
import React, { useState, useRef, JSX, useEffect } from "react";
import BlogImage from "../../public/blogsherosectionimage.jpg";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ImageUpload({
  post_id,
  imgUrl,
  imgAlt,
  languageCode,
}: {
  post_id: string | number;
  imgUrl: string | null;
  imgAlt: string;
  languageCode: string;
}): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false); // New state

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      console.log("Upload hit in frontend");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("postId", `${post_id}`); // no need to JSON.stringify
      formData.append("language_code", languageCode); // <-- REQUIRED for backend update

      if (imgAlt) {
        formData.append("cover_image_alt_tag", imgAlt);
      } else {
        console.log("image Alt Text not Available");
      }

      const res = await fetch("http://localhost:5000/api/images/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      // Update state with response
      setPreviewUrl(data.url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  console.log(imgAlt);
  console.log(imgUrl);

  console.log(previewUrl);
  console.log(imgAlt);

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
        <Image src={BlogImage} alt="BlogImage" />
        {/* {imgUrl ? (
          <div>
            <Image
              fill
              src={imgUrl}
              alt={imgAlt ? imgAlt : "don't have alt text"}
              className="w-fit mx-auto max-h-48 rounded-md shadow-md"
            />
          </div>
        ) : file ? (
          <div>
            <Image
              fill
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
        )} */}
      </div>
      <button
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-md disabled:bg-gray-400"
        onClick={() => handleUpload()}
        disabled={!file || uploading}
      >
        {uploading ? "..." : "Upload"}
      </button>
      {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
