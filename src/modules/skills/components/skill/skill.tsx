import React from "react";
import styles from "./skill.module.scss";
import { ProgressBar } from "@/components/progress-bar/progress-bar";

interface Props {
  skill: {
    name: string;
    level: number;
  };
  animationDelay: number;
}

export const Skill = ({ skill, animationDelay }: Props) => {
  return (
    <div
      className={`${styles.skill}`}
      style={{ animationDelay: `${animationDelay}s` }}
      key={skill.name}
    >
      <h3 className={styles.skill__name}>{skill.name}</h3>
      <ProgressBar percentage={skill.level} />
    </div>
  );
};
