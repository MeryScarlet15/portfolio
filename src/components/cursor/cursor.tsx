"use client";

import React, { useEffect, useState } from "react";
import styles from "./cursor.module.scss";
import { motion } from "framer-motion";

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <motion.div
      className={styles.cursor}
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: "spring", damping: 30, mass: 0.5, stiffness: 400 }}
    />
  );
};
