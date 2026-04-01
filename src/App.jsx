import "./index.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import AboutEvent from "./components/sections/AboutEvent";
import Highlights from "./components/sections/Highlights";
import Stats from "./components/sections/Stats";
import MapSection from "./components/sections/MapSection";
import Visitors from "./components/sections/Visitors";
import Exhibitors from "./components/sections/Exhibitors";
import Contact from "./components/sections/Contact";
import Register from "./components/sections/Register";

export default function App() {
  return (
    <div className='min-h-screen bg-[#0A0A0A]'>
      <Navbar />
      <main>
        {/* HOME */}
        <section id='inicio'>
          <Hero />
          <AboutEvent />
          <Highlights />
          <Stats />
          <MapSection />
        </section>
        {/* VISITANTES */}
        <section id='visitantes'>
          <Visitors />
        </section>
        <section id='register'>
          <Register />
        </section>
        {/* EXPOSITORES
        <section id='expositores'>
          <Exhibitors />
        </section> */}
        {/* CONTACTO */}
        {/* <section id='contacto'>
          <Contact />
        </section> */}
      </main>
      <Footer />
    </div>
  );
}
