import React from "react";

import { UIContextProvider } from "@/context/ui-context";

import styles from "./main.module.scss";
import { Header } from "../header/header";

interface Props {
  children: React.ReactNode;
  className?: string;
  noMargin?: boolean;
}

export default function Main({
  children,
  className = "",
}: Props): React.ReactElement {
  return (
    <UIContextProvider>
      <Header />
      {/* TODO - Add aside */}

      <main className={`${styles.main}  ${className}`}>{children}</main>
      {/* TODO - Add footer */}
    </UIContextProvider>
  );
}
