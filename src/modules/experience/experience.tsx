import React from "react";
import styles from "./experience.module.scss";
import { Job } from "./components/job/job";
const jobs = [
  {
    title: "Senior Fullstack Developer",
    company: "Tech Innovators Inc.",
    period: "2020 - Present",
    description:
      "Led development of scalable web applications using React and Node.js. Implemented microservices architecture and improved system performance by 40%.",
  },
  {
    title: "Fullstack Developer",
    company: "Digital Solutions Ltd.",
    period: "2017 - 2020",
    description:
      "Developed and maintained multiple client projects using MERN stack. Collaborated with design team to implement responsive and accessible user interfaces.",
  },
  {
    title: "Junior Web Developer",
    company: "WebCraft Agency",
    period: "2015 - 2017",
    description:
      "Assisted in the development of client websites using HTML, CSS, and JavaScript. Gained experience in version control and agile methodologies.",
  },
];

export const Experience: React.FC = () => {
  return (
    <section className={styles.experience}>
      <h2 className={styles.experience__title}>Experience</h2>
      <div className={styles.experience__job_list}>
        {jobs.map((job, index) => (
          <Job job={job} animationDelay={index * 0.1} key={index} />
        ))}
      </div>
    </section>
  );
};
