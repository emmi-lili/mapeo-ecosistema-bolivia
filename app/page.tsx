import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductMockup from "@/components/ProductMockup";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Integrations from "@/components/Integrations";
import FounderNote from "@/components/FounderNote";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProductMockup />
        <Testimonials />
        <Features />
        <Integrations />
        <FounderNote />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
