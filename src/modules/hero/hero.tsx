import React from "react";
import styles from "./Hero.module.scss";
import { Button } from "../../components/button/button";

export default function Hero(): React.ReactElement {
  return (
    <section className={styles.hero__container}>
      <div className={styles.hero__background}></div>
      <div className={styles.hero__background_gradient}></div>
      <article className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Hi there! <br />
            I'm María Amado
            <br />
            <span className={styles.hero__title_highlight}>
              A Javascript Fullstack Developer
            </span>
          </h1>
          <div className={styles.hero__button}>
            <Button
              text="Get in touch"
              ariaLabel="Get in touch"
              className={styles.hero__button}
            />
          </div>
        </div>
        <div className={styles.hero__image}>{/* TODO - IMAGE */}</div>
      </article>
    </section>
  );
}