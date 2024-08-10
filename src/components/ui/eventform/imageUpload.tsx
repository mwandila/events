


import React, { useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imagePreview, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onImageChange(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onImageChange(event.target.files[0]);
    }
  };

  return (
    <div className="col-span-2">
      <label className="block text-gray-700 mb-2">Event Image:</label>
      <div
        className="border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Event"
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <div className="text-center">Drag & Drop or Click to Upload</div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;