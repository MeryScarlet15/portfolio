import React from "react";
import styles from "./skills.module.scss";
import { Skill } from "./components/skill/skill";

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "SQL", level: 70 },
  { name: "MongoDB", level: 65 },
  { name: "GraphQL", level: 60 },
  { name: "Docker", level: 55 },
];

export const Skills: React.FC = () => {
  return (
    <section className={styles.skills}>
      <div className={styles.skills__container}>
        <h2 className={styles.skills__title}>Main Skills</h2>
        <div className={styles.skills__grid}>
          {skills.map((skill, index) => (
            <Skill skill={skill} animationDelay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
