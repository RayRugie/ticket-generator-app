import { useState, useRef, ChangeEvent, DragEvent } from "react";
import styles from "./uploadImage.module.scss";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string | File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    
    try {
      setIsLoading(true);
     
      const localPreview = URL.createObjectURL(file);
      setSelectedImage(localPreview);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcmvrcdc8/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
  
      const data = await response.json();
      if (data.secure_url) {
        setSelectedImage(data.secure_url);
        onImageUpload(data.secure_url);
        console.log("Upload successful:", data.secure_url);
        // Clean up local preview
        URL.revokeObjectURL(localPreview);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setSelectedImage(null);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };

  return (
    <div
      className={`${styles["image-upload-container"]} ${isDragging ? styles["dragging"] : ""}`}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles["image-input"]}
        onChange={handleChange}
        aria-label="Image input"
      />
      {isLoading ? (
        <span>Uploading image...</span>
      ) : selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected"
          className={styles["image-preview"]}
        />
      ) : (
        <div className={styles["image-placeholder"]}>
          <img src="cloud-download.svg" alt="cloud icon" />
          <p>Drag & drop or click to upload</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;