import React from "react";
import styles from "./skills.module.scss";
import { Skill } from "./components/skill/skill";

const skills = [
  { name: "Nextjs", level: 100 },
  { name: "Nodejs", level: 100 },
  { name: "Nestjs", level: 100 },
  { name: "SEO", level: 100 },
  { name: "Typescript", level: 100 },
  { name: "GraphQL", level: 100 },
  { name: "React", level: 100 },
  { name: "Postgres", level: 100 },
  { name: "Cursor", level: 100 },
  { name: "OpenAI", level: 90 },
  { name: "Python", level: 80 },
  { name: "AWS", level: 80 },
];

export const Skills: React.FC = () => {
  return (
    <section className={styles.skills}>
      <div className={styles.skills__container}>
        <h2 className={styles.skills__title}>Main Technologies</h2>
        <div className={styles.skills__grid}>
          {skills.map((skill, index) => (
            <Skill skill={skill} animationDelay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
