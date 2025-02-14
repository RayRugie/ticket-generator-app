import { useTabContext } from "../../contexts/TabContext";
import ImageUpload from "../uploadImage/uploadImage";
import { useFormContext } from "../../contexts/FormContext";
import styles from "./AttendeeDetails.module.scss";

const AttendeeDetails = () => {
  const {
    dispatch,
    state: { imageUrl },
  } = useFormContext();
  const { onNextTab, onPreviousTab } = useTabContext();

  const handleImageUpload = (url: string | File) => {
    dispatch({ type: "UPDATE_IMAGE_URL", payload: url });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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
              Upload Profile Photo
            </label>
            <ImageUpload onImageUpload={handleImageUpload} />
            <div className={styles["image-overlay"]}></div>
          </div>
        </div>

        <div className={styles.separator}></div>

        <div className={styles["input-group"]} aria-labelledby="name input">
          <label htmlFor="name">Enter your name</label>
          <input
            type="text"
            id="name"
            name="name"
            aria-labelledby="name input"
            onChange={(e) =>
              dispatch({ type: "UPDATE_NAME", payload: e.target.value })
            }
            className={styles["input-field"]}
          />
        </div>

        <div
          className={styles["input-group"]}
          aria-labelledby="email input"
        >
          <label htmlFor="email">Enter your email</label>
          <div className={styles["email-input"]}>
            <input
              type="text"
              placeholder="hello@avioflagos.io"
              aria-labelledby="email input"
              onChange={(e) =>
                dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
              }
            />
            <img
              src="mail-icon.svg"
              alt="mail icon"
              className={styles["email-icon"]}
              aria-labelledby="mail icon for email input"
            />
          </div>
        </div>

        <div
          className={styles["input-group"]}
          aria-labelledby="project details input"
        >
          <label htmlFor="project">About the project</label>
          <textarea
            onChange={(e) =>
              dispatch({
                type: "UPDATE_SPECIAL_REQUEST",
                payload: e.target.value,
              })
            }
            name="project"
            placeholder="Textarea"
            id="project"
            className={styles["textarea-field"]}
            aria-labelledby="project details input"
          ></textarea>
        </div>

        <div className={styles["button-group"]}>
          <button
            onClick={() => onPreviousTab(1)}
            className={`${styles.button} ${styles["button-back"]}`}
            aria-labelledby="previous form button"
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
