import { useTabContext } from "../../contexts/TabContext";
import ImageUpload from "../uploadImage/uploadImage";
import { useFormContext } from "../../contexts/FormContext";
import styles from "./AttendeeDetails.module.scss";
import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  project?: string;
  image?: string;
}

const AttendeeDetails = () => {
  const {
    dispatch,
    state: { imageUrl },
  } = useFormContext();
  const { onNextTab, onPreviousTab } = useTabContext();
  const [errors, setErrors] = useState<FormErrors>({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const project = formData.get('project') as string;

    // Name validation
    if (!name || name.trim() === '') {
      errors.name = 'Name is required';
    }

    // Email validation
    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Project validation
    if (!project || project.trim() === '') {
      errors.project = 'Project details are required';
    }

    // Image validation
    if (!imageUrl) {
      errors.image = 'Profile photo is required';
    }

    return errors;
  };

  const handleImageUpload = (url: string | File) => {
    dispatch({ type: "UPDATE_IMAGE_URL", payload: url });
    // Clear image error when image is uploaded
    setErrors(prev => ({ ...prev, image: undefined }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formObject = Object.fromEntries(formData.entries());
    if (imageUrl) {
      formObject.imageUrl = imageUrl;
    }

    console.log("Form Data:", formObject);
    onNextTab();
  };

  return (
    <div className={styles["attendee-details"]}>
      <form
        aria-labelledby="attendee details form"
        className={styles["attendee-form"]}
        onSubmit={onSubmit}
      >
        <div
          className={styles["image-upload-container"]}
          aria-labelledby="form image input"
        >
          <div className={styles["image-upload-wrapper"]}>
            <label htmlFor="image" className="place-self-start">
              Upload Profile Photo *
            </label>
            <ImageUpload onImageUpload={handleImageUpload} />
            {errors.image && (
              <span className={styles["error-message"]}>{errors.image}</span>
            )}
            <div className={styles["image-overlay"]}></div>
          </div>
        </div>

        <div className={styles.separator}></div>

        <div className={styles["input-group"]} aria-labelledby="name input">
          <label htmlFor="name">Enter your name *</label>
          <input
            type="text"
            id="name"
            name="name"
            aria-labelledby="name input"
            onChange={(e) => {
              dispatch({ type: "UPDATE_NAME", payload: e.target.value });
              // Clear error when user starts typing
              if (e.target.value) {
                setErrors(prev => ({ ...prev, name: undefined }));
              }
            }}
            className={`${styles["input-field"]} ${errors.name ? styles["error-input"] : ""}`}
          />
          {errors.name && (
            <span className={styles["error-message"]}>{errors.name}</span>
          )}
        </div>

        <div className={styles["input-group"]} aria-labelledby="email input">
          <label htmlFor="email">Enter your email *</label>
          <div className={styles["email-input"]}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="hello@avioflagos.io"
              aria-labelledby="email input"
              onChange={(e) => {
                dispatch({ type: "UPDATE_EMAIL", payload: e.target.value });
                // Clear error when user starts typing
                if (e.target.value) {
                  setErrors(prev => ({ ...prev, email: undefined }));
                }
              }}
              className={`${styles["input-field"]} ${errors.email ? styles["error-input"] : ""}`}
            />
            <img
              src="mail-icon.svg"
              alt="mail icon"
              className={styles["email-icon"]}
              aria-labelledby="mail icon for email input"
            />
          </div>
          {errors.email && (
            <span className={styles["error-message"]}>{errors.email}</span>
          )}
        </div>

        <div className={styles["input-group"]} aria-labelledby="project details input">
          <label htmlFor="project">Special Request *</label>
          <textarea
            onChange={(e) => {
              dispatch({
                type: "UPDATE_SPECIAL_REQUEST",
                payload: e.target.value,
              });
              // Clear error when user starts typing
              if (e.target.value) {
                setErrors(prev => ({ ...prev, project: undefined }));
              }
            }}
            name="project"
            placeholder="Textarea"
            id="project"
            className={`${styles["textarea-field"]} ${errors.project ? styles["error-input"] : ""}`}
            aria-labelledby="project details input"
          ></textarea>
          {errors.project && (
            <span className={styles["error-message"]}>{errors.project}</span>
          )}
        </div>

        <div className={styles["button-group"]}>
          <button
            onClick={() => onPreviousTab(1)}
            className={`${styles.button} ${styles["button-back"]}`}
            aria-labelledby="previous form button"
            type="button"
          >
            Back
          </button>
          <button
            aria-labelledby="next form button"
            type="submit"
            className={`${styles.button} ${styles["button-submit"]}`}
          >
            Get My Free Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendeeDetails;