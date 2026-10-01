import "./index.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Hero from "./components/sections/Hero";
import AboutEvent from "./components/sections/AboutEvent";
import Highlights from "./components/sections/Highlights";
import Stats from "./components/sections/Stats";
import Visitors from "./components/sections/Visitors";
import ExperienceGallery from "./components/sections/ExperienceGallery";
import Brands from "./components/sections/Brands";

export default function App() {
  return (
    <div className='min-h-screen bg-[#FFF5F8] text-[#2B1E22] selection:bg-[#E11D74] selection:text-white'>
      <Navbar />
      <main>
        <div id='events-list'>
          <Hero />
        </div>
        <AboutEvent />
        <Highlights />
        <Stats />
        <Brands />
        <ExperienceGallery />
        <Visitors />
      </main>
      <Footer />
    </div>
  );
}
