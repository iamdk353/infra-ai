import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Marquee from "@/components/marquee";
import Testimonials from "@/components/testimonial";
import Image from "next/image";

const page = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="w-full h-[80vh]">
        <Hero />
        <Marquee />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};
export default page;
