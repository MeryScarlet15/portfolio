import React from "react";
import styles from "./experience.module.scss";
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
    <section id="experience" className={styles.experience}>
      <h2 className={styles.experience__title}>Experience</h2>
      <div className={styles.experience__job_list}>
        {jobs.map((job, index) => (
          <div
            className={styles.experience__job_item}
            style={{ animationDelay: `${index * 0.1}s` }}
            key={index}
          >
            <h3 className={styles.experience__job_title}>{job.title}</h3>
            <p className={styles.experience__job_meta}>
              {job.company} | {job.period}
            </p>
            <p className={styles.experience__job_description}>
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
