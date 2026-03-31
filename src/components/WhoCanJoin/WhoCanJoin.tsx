import React from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import "./style.scss";

const imgBeginners = "/images/icons/w1.png";
const imgProfessionals = "/images/icons/w2.png";
const imgStudents = "/images/icons/w3.png";
const imgFreelancers = "/images/icons/w-4.png";
const imgCheck = "/images/icons/who-can-join-tick.png";

const audienceCards = [
  {
    icon: imgBeginners,
    title: "Complete Beginners",
    description:
      "Start from the basics, learn step by step, and build confidence through guided practice and weekly reviews today.",
  },
  {
    icon: imgStudents,
    title: "Students",
    description:
      "Strengthen job-ready skills, build a solid portfolio, and get support for placements, internships, and entry-level opportunities here quickly.",
  },
  {
    icon: imgProfessionals,
    title: "Working Professionals",
    description:
      "Upgrade your expertise or switch careers with structured modules, real assignments, and mentor guidance that fits your schedule.",
  },
  {
    icon: imgFreelancers,
    title: "Freelancers and Entrepreneurs",
    description:
      "Learn to deliver client-ready work, price your services, and build a portfolio that helps you win projects consistently.",
  },
];

const WhoCanJoin = () => {
  return (
    <section className="who-can-join-container-main">
      <div className="who-can-join-container container">
        <SectionHeading
          className="who-can-join__heading"
          eyebrow="Who Can Join"
          title="If You’re Ready to Learn, You’re Ready for Aider."
          accent="Ready to Learn,"
          layout="split"
          sideDescription="Whether you’re a beginner, a student, or a working professional, Aider is built for you."
        />

        <div className="feature-items-container-who-can-join">
          {audienceCards.map((item) => (
            <article className="who-can-join-card" key={item.title}>
              <div className="who-can-join-card__icon-wrap">
                <img src={item.icon} alt="" aria-hidden="true" />
              </div>
              <div className="who-can-join-card__content">
                <h3 className="who-can-join-card__title">{item.title}</h3>
                <p className="who-can-join-card__description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="who-can-join__note">
          <img src={imgCheck} alt="" aria-hidden="true" />
          <p>No prior experience required. Consistency is what creates results.</p>
        </div>
      </div>
    </section>
  );
};

export default WhoCanJoin;
