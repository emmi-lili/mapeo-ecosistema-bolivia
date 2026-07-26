import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Insight from "@/components/Insight";
import Download from "@/components/Download";
import Footer from "@/components/Footer";
import { hallazgo, web3 } from "@/config/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Timeline />
        <Insight
          id={hallazgo.id}
          number="02"
          eyebrow={hallazgo.eyebrow}
          title={hallazgo.title}
          paragraphs={hallazgo.paragraphs}
          note={hallazgo.note}
        />
        <Insight
          id={web3.id}
          number="03"
          eyebrow={web3.eyebrow}
          title={web3.title}
          paragraphs={web3.paragraphs}
          note={web3.note}
          surface
        />
        <Download />
      </main>
      <Footer />
    </>
  );
}
