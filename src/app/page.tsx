import { Metadata } from "next";
import styles from "./page.module.scss";
import Hero from "../modules/hero/hero";
import Main from "../modules/layout/main/main";
import { PolygonHr } from "@/components/hr/polygon-hr/polygon-hr";
import { About } from "@/modules/about/about";
import { Skills } from "@/modules/skills/skills";
import { Experience } from "@/modules/experience/experience";
export const metadata: Metadata = {
  title: "Maria Amado | Full Stack Developer",
  description: "Full Stack Developer portfolio",
};

const Home = async () => {
  return (
    <Main className={styles.home__main}>
      <Hero />
      <PolygonHr direction="topRight" />
      <About />
      <PolygonHr direction="bottomLeft" />
      <Skills />
      <PolygonHr direction="topLeft" />
      <Experience />
    </Main>
  );
};

export default Home;
