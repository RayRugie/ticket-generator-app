import styles from "./Ready.module.scss";
import { useTabContext } from "../../contexts/TabContext";
import TechemberTicket from "../Ticket/Ticket";

const Ready: React.FC = () => {
  const { onPreviousTab } = useTabContext();

  return (
    <div className={styles["ready-container"]} aria-labelledby="booked ticket details">
      <div className={styles["ready-message"]}>
        <p className={styles["ready-text"]}>Your Ticket is Booked!</p>
        <span>
          Check your email for a copy or you can <span>download</span>
        </span>
      </div>

      <TechemberTicket />

      <div className={styles["button-group"]}>
        <button
          onClick={() => onPreviousTab(1)}
          aria-labelledby="download ticket button"
          className={styles["book-button"]}
        >
          Book Another Ticket
        </button>
        <button
          className={styles["download-button"]}
          aria-labelledby="button to book another ticket"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ready;
