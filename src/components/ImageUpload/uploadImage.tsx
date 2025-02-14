import { useState, useRef, ChangeEvent, DragEvent } from "react";
import styles from "./uploadImage.module.scss";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string | File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_1");

    try {
      setIsLoading(true);
      console.log("Starting function call");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcmvrcdc8/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      

      const data = await response.json();
      if (data.secure_url) {
        setSelectedImage(data.secure_url);
        onImageUpload(data.secure_url);
      }
      console.log(data);
    } catch (error) {
      console.error("Error uploading image:", error);
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
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };

  return (
    <div
      className={styles["image-upload-container"]}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles["image-input"]}
        onChange={handleChange}
        aria-labelledby="image input"
      />
      {selectedImage ? (
        isLoading ? (
          <span>Uploading image...</span>
        ) : (
          <img
            src={selectedImage}
            alt="Selected"
            className={styles["image-preview"]}
          />
        )
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
