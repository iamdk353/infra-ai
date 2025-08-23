import FAQ02 from "@/components/faq-02/faq-02";
import Features06Page from "@/components/features-06/features-06";
import Footer05Page from "@/components/footer-05/footer-05";
import Hero03 from "@/components/hero-03/hero-03";
import Navbar05Page from "@/components/navbar-05/navbar-05";

const page = () => {
  return (
    <div className="flex flex-col">
      <Hero03 />
      <Features06Page />
      <FAQ02 />
    </div>
  );
};
export default page;
