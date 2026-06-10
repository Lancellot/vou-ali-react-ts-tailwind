
import Hero from "../../components/home/Hero";
import Stats from "../../components/home/Stats";
import Features from "../../components/home/Features";
import HowItWorks from "../../components/home/HowItWorks";
import CTA from "../../components/home/CTA";

export default function Home() {
  return (
    <div className="home-root">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
}