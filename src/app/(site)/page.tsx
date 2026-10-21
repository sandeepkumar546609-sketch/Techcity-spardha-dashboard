import About from "@/components/landing/About";
import Assessments from "@/components/landing/Assessments";
import ClosingCta from "@/components/landing/ClosingCta";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Metrics from "@/components/landing/Metrics";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Assessments />
      <Metrics />
      <ClosingCta />
      <Footer />
    </main>
  );
}
