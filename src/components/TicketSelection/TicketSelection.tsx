import styles from "./TicketSelection.module.scss";
import { useFormContext } from "../../contexts/FormContext";
import { useTabContext } from "../../contexts/TabContext";
import TicketTitle from "../TicketTitle/TicketTitle";
import TicketType from "../TicketType/TicketType";

const TicketSelection = () => {
  const { dispatch } = useFormContext();
  const { onNextTab } = useTabContext();

  const options = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={styles["ticket-selection-container"]}>
      <TicketTitle />

      <div className={styles["ticket-divider"]}></div>

      <TicketType />

      <div className={styles["ticket-form-group"]}>
        <label>Number of Tickets</label>
        <select
          aria-labelledby="ticket number selection"
          className={styles["ticket-select"]}
          onChange={(e) =>
            dispatch({
              type: "TICKET_QUANTITY",
              payload: Number(e.target.value),
            })
          }
        >
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["ticket-buttons"]}>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          aria-labelledby="cancel form input button"
          className={`${styles["ticket-button"]} ${styles["cancel"]}`}
        >
          Cancel
        </button>
        <button
          onClick={onNextTab}
          aria-labelledby="next form button"
          className={`${styles["ticket-button"]} ${styles["next"]}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketSelection;
