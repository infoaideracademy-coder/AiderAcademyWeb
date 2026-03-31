import AboutHero from "@/components/AboutComponents/AboutHero/AboutHero";
import AboutLogoScrollSection from "@/components/AboutComponents/AboutLogoScrollSection/AboutLogoScrollSection";
import AboutStorySection from "@/components/AboutComponents/AboutStorySection/AboutStorySection";
import AboutValueSection from "@/components/AboutComponents/AboutValueSection/AboutValueSection";
import AboutpageMotion from "@/components/AboutpageMotion/AboutpageMotion";
import BottomCtaSection from "@/components/BottomCtaSection/BottomCtaSection";
import CounterSection from "@/components/AboutComponents/CounterSection/CounterSection";
import TestimoinalsSection from "@/components/TestimonialsSection/TestimoinalsSection";
import "./style.scss";

const imgVision = "/images/vision.png";
const imgMission = "/images/mission.png";

export default function AboutPage() {
  return (
    <main className="about-page-main">
      <AboutHero />
      <CounterSection />
      <AboutStorySection />
      <AboutValueSection
        eyebrow="Our Vision"
        title="The Long-Term Goal"
        accent="Goal"
        description="Aider Academy is built to set a higher standard for career training. We want learning to feel practical, structured, and measurable, so students leave with real capability, not just course completion. Our focus is to consistently produce confident professionals with portfolio-ready work and the clarity to step into jobs, internships, freelancing, or entrepreneurship."
        image={imgVision}
        imageAlt="Student focused on laptop-based learning at home"
        reverse
      />
      <AboutValueSection
        eyebrow="Our Mission"
        title="What We’re Here to Do"
        accent="Here to Do"
        description="Our mission is to make learners genuinely job-ready through structured training, hands-on assignments, and consistent mentorship. We focus on strong fundamentals, real project work, and clear guidance so every student builds confidence, a solid portfolio, and the ability to perform in real roles."
        image={imgMission}
        imageAlt="Team of learners collaborating around laptops in a classroom setting"
      />
      <AboutLogoScrollSection />
      <TestimoinalsSection />
      <BottomCtaSection />
      <AboutpageMotion />
    </main>
  );
}
