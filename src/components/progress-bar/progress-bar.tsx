import styles from "./progress-bar.module.scss";
import React from "react";

interface Props {
  percentage: number;
}

export const ProgressBar = ({ percentage }: Props) => {
  return (
    <div className={styles.progress_bar}>
      <div
        className={styles.progress_bar__progress}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
