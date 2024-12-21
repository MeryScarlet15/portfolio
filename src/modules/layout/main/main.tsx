import React from "react";

import { UIContextProvider } from "@/context/ui-context";

import styles from "./main.module.scss";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Cursor } from "@/components/cursor/cursor";

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
      <Cursor />
      <Header />
      {/* TODO - Add aside */}

      <main className={`${styles.main}  ${className}`}>{children}</main>
      <Footer />
    </UIContextProvider>
  );
}
