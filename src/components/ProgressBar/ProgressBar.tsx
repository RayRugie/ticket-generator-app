import styles from "./ProgressBar.module.scss";

interface PropTypes {
  value: number;
  color: string;
}

const ProgressBar: React.FC<PropTypes> = ({ value, color }) => {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className={styles["progress-bar"]} aria-labelledby="form progress bar">
      <div
        className={styles["progress-fill"]}
        style={{ width: `${progress}%`, backgroundColor: color  }}
      ></div>
    </div>
  );
};

export default ProgressBar;
