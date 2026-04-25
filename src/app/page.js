import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";
import Progress from "./components/progress";
import Featured from "./components/featured";
import Featured2 from "./components/featured2";
import Featured3 from "./components/featured3";
import CallToAction from "./components/calltoaction";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <Featured2 />
      <Featured3 />
      <Featured />
      <div className="py-24 bg-neutral-50">
        <div className="section-container">
          <CallToAction />
        </div>
      </div>
      <Progress />
      <Footer />
    </main>
  );
}

