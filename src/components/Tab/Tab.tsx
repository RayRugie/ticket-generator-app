import styles from "./Tab.module.scss";
import { useTabContext } from "../../contexts/TabContext";
import ProgressBar from "../ProgressBar/ProgressBar";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Tab: React.FC<Props> = ({ title, children }) => {
  const { activeTab: tabNumber } = useTabContext();
  const tabPercentage = (tabNumber / 3) * 100;

  return (
    <div className={styles["tab-container"]} aria-labelledby="ticket selection form">
      <div className={styles["tab-header"]}>
        <div className={styles["tab-header-top"]}>
          <span aria-labelledby="form title" className={styles["tab-title"]}>
            {title}
          </span>
          <span aria-labelledby="form step number" className={styles["tab-step"]}>
            Step {tabNumber}/3
          </span>
        </div>
        <ProgressBar color="#24A0B5" value={tabPercentage} />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Tab;
