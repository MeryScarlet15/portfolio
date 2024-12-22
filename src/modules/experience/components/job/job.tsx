import React from "react";
import styles from "./job.module.scss";

type Props = {
  job: {
    title: string;
    company: string;
    period: string;
    description: string;
  };
  animationDelay?: number;
};

const DEFAULT_ANIMATION_DELAY = 0;

export const Job = ({ job, animationDelay }: Props) => {
  return (
    <div
      className={styles.job}
      style={{
        animationDelay: `${animationDelay || DEFAULT_ANIMATION_DELAY}s`,
      }}
    >
      <h3 className={styles.job__title}>{job.title}</h3>
      <p className={styles.job__meta}>
        {job.company} | {job.period}
      </p>
      <p className={styles.job__description}>{job.description}</p>
    </div>
  );
};