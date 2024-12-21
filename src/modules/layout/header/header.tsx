"use client";
import React, { useState } from "react";
import styles from "./header.module.scss";
import { motion } from "framer-motion";

const sections = ["Home", "About", "Skills", "Experience", "Contact"];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("Home");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <motion.div
          className={styles.header__title}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          &lt;JS/&gt;
        </motion.div>
        <ul className={styles.header__ul}>
          {sections.map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => scrollTo(item.toLowerCase())}
                className={`${styles.header__li__button} ${
                  activeSection === item.toLowerCase() ? "bold" : "white"
                }`}
              >
                {item}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
