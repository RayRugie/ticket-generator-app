import styles from "./TicketTitle.module.scss";

const TicketTitle = () => {
  return (
    <div className={styles["ticket-title"]} aria-labelledby="event details">
      <p aria-labelledby="event name" className={styles["ticket-title-heading"]}>
        Techember Fest "25
      </p>

      <div className={styles["ticket-title-details"]}>
        <span className={styles["ticket-title-description"]}>
          Join us for an unforgettable experience at [Event Name]! Secure your
          spot now.
        </span>
        <div className={styles["ticket-title-location"]}>
          <span>📍 [Event Location]</span>
          <span className={styles.separator}>||</span>
          <span aria-labelledby="event time">March 15, 2025 | 7:00 PM</span>
        </div>
      </div>
    </div>
  );
};

export default TicketTitle;
