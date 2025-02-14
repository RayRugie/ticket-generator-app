import { useFormContext } from "../../contexts/FormContext";
import styles from "./TicketType.module.scss";

interface TicketTypes {
  name: string;
  amount: number | string;
  capacity: number;
}

const ticketTypes: TicketTypes[] = [
  {
    name: "regular access",
    amount: "free",
    capacity: 20,
  },
  {
    name: "vip access",
    amount: 50,
    capacity: 20,
  },
  {
    name: "vvip access",
    amount: 150,
    capacity: 20,
  },
];

const TicketType: React.FC = () => {
  const {
    dispatch,
    state: { ticketType },
  } = useFormContext();

  const handleTicketData = (ticketPrice: string | number, ticketType: string) => {
    dispatch({ type: "TICKET_PRICE", payload: ticketPrice });
    dispatch({ type: "TICKET_TYPE", payload: ticketType });
  };

  return (
    <div
      aria-labelledby="event ticket type"
      className={styles["ticket-type-container"]}
    >
      <span>Select Ticket Type:</span>
      <ul className={styles["ticket-list"]}>
        {ticketTypes.map((ticket) => (
          <li
            key={ticket.name}
            className={`${styles["ticket-item"]} ${ticket.name === ticketType ? styles.selected : ""}`}
            onClick={() => handleTicketData(ticket.amount, ticket.name)}
          >
            <div className={styles["ticket-info"]}>
              <span aria-labelledby="ticket name" className={styles["ticket-name"]}>
                {ticket.name}
              </span>
              <span className={styles["ticket-capacity"]} aria-labelledby="ticket capacity">
                {ticket.capacity} left!
              </span>
            </div>
            <button aria-labelledby="ticket amount" className={styles["ticket-amount"]}>
              {typeof ticket.amount === "string" ? "Free" : `$${ticket.amount}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketType;
