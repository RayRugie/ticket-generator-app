import styles from "./ticket.module.scss";
import { useFormContext } from "../../contexts/FormContext";

const TechemberTicket = () => {
  const {
    state: { name, email, ticketType, quantity, specialRequest, imageUrl },
  } = useFormContext();

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
                    aria-labelledby="user image"
                    src={(imageUrl as string) || "/user-image.svg"}
                    alt="user image"
                    className={styles["ticket-user-image"]}
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
          <div className={styles["svg-container"]}>
            <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
              <path
                d="M40,0 C40,0 80,0 120,0
                   C360,0 360,0 360,0
                   C360,0 400,40 400,40
                   L400,110 C400,110 360,150 360,150
                   L40,150 C40,150 0,110 0,110
                   L0,40 C0,40 40,0 40,0 Z"
                fill="none"
                stroke="#24A0B5"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className={styles["inner-svg-container"]}>
            <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
              <path
                d="M35,0 C35,0 75,0 115,0
                   C365,0 365,0 365,0
                   C365,0 400,35 400,35
                   L400,115 C400,115 365,150 365,150
                   L35,150 C35,150 0,115 0,115
                   L0,35 C0,35 35,0 35,0 Z"
                fill="none"
                stroke="#24A0B5"
                strokeWidth="2"
              />
            </svg>
          </div>

          <img src="bar-code-large.svg" alt="bar code image" />
        </div>
      </div>
    </div>
  );
};

export default TechemberTicket;
