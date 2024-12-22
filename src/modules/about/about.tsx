import React from "react";
import styles from "./about.module.scss";
import Image from "next/image";
import aboutImage from "public/images/about.jpg";

export const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <h2 className={styles.about__title}>About Me</h2>
      <div className={styles.about__content}>
        <div className={styles.about__image_container}>
          <Image
            src={aboutImage}
            alt="María Amado - About Me"
            width={400}
            height={400}
            className={styles.about__image}
            loading="lazy"
            placeholder="blur"
            quality={75}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 400px, 400px"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              filter: "grayscale(30%)",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
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
