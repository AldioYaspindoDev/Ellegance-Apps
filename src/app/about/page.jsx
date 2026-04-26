import Navbar from "../components/navbar";
import History from "../components/history";
import Whoweare from "../components/whoweare";
import OurValues from "../components/ourvalues";
import Materials from "../components/materials";
import OurJourney from "../components/ourjourney";
import OurStudios from "../components/ourstudios";
import ContactUs from "../components/contactus";
import Footer from "../components/footer";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <History />
      <Whoweare />
      <OurValues />
      <Materials />
      <OurJourney />
      <OurStudios />
      <ContactUs />
      <Footer />
    </main>
  );
}