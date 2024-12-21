import React from "react";
import styles from "./about.module.scss";

export const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.about__title}>About Me</h2>
      <div className={styles.about__content}>
        <div className={styles.about__image}></div>
        <div className={styles.about__text}>
          <p>
            I'm a passionate fullstack developer with a love for creating
            efficient, scalable, and user-friendly web applications. With
            expertise in both frontend and backend technologies, I bring ideas
            to life through clean code and innovative solutions.
          </p>
        </div>
      </div>
    </section>
  );
};
