import styles from "./Ticket.module.scss";
import { useFormContext } from "../../contexts/FormContext";

const TechemberTicket = () => {
  const {
    state: { name, email, ticketType, quantity, specialRequest, imageUrl },
  } = useFormContext();

    // Add these console logs
    console.log("Current imageUrl in ticket:", imageUrl);
    console.log("Type of imageUrl:", typeof imageUrl);
  
  return (
    <div className={styles["ticket-container"]}>
      <div className={styles["ticket-wrapper"]}>
        <div className={styles["ticket-box"]}>
          <div className={styles["ticket-content"]}>
            <div id="inner-div" className={styles["ticket-inner"]}>
              <div className={styles["ticket-header"]}>
                <h1 className={styles["ticket-title"]}>Techember Fest '25</h1>
                <div className={styles["ticket-details"]} aria-labelledby="event details">
                  <p aria-labelledby="event location">📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p aria-labelledby="event time">🕐 March 15, 2025 | 7:00 PM</p>
                </div>
              </div>

              <div className={styles["ticket-image"]}>
  <div className={styles["ticket-image-container"]}>
    <img
      aria-label="user image"
      src={imageUrl && typeof imageUrl === 'string' ? imageUrl : '/user-image.svg'}
      alt="user image"
      className={styles["ticket-user-image"]}
      onError={(e) => {
        console.error('Image failed to load:', imageUrl);
        e.currentTarget.src = '/user-image.svg';
      }}
    />
  </div>
</div>

              <div className={styles["ticket-info"]}>
                <div className={styles["ticket-info-grid"]}>
                  <div className={styles["ticket-info-item"]}>
                    <span className={styles["ticket-info-label"]}>Enter your name:</span>
                    <p aria-labelledby="user's name" className="font-bold capitalize">
                      {name || " Avi Chukwu"}
                    </p>
                  </div>
                  <div className={styles["ticket-info-item"]}>
                    <span className={styles["ticket-info-label"]}>Ticket for:</span>
                    <p aria-labelledby="user's email" className="font-bold">
                      {email || "User@email.com"}
                    </p>
                  </div>
                  <div className={styles["ticket-info-item"]}>
                    <span className={styles["ticket-info-label"]}>Ticket Type:</span>
                    <p className="uppercase" aria-labelledby="ticket type">
                      {ticketType || "VIP"}
                    </p>
                  </div>
                  <div className={styles["ticket-info-item"]}>
                    <span className={styles["ticket-info-label"]}>Ticket for:</span>
                    <p aria-labelledby="number of tickets">{quantity || "1"}</p>
                  </div>
                </div>
                <div className={styles["ticket-info-item"]}>
                  <span className={styles["ticket-info-label"]}>Special request?</span>
                  <p aria-labelledby="user special request">
                    {specialRequest ||
                      " Nil? Or the users sad story they write in there gets this whole space, Max of three rows."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["ticket-barcode"]}>
          <img src="bar-code-large.svg" alt="bar code image" />
        </div>
      </div>
    </div>
  );
};

export default TechemberTicket;
