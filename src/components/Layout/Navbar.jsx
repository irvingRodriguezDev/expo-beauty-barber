import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", to: "inicio" },
  { label: "Visitantes", to: "visitantes" },
  { label: "Expositores", to: "expositores" },
  { label: "Contacto", to: "contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = navLinks.map((l) => document.getElementById(l.to));
      const current = sections.findLast((s) => {
        if (!s) return false;
        return s.getBoundingClientRect().top <= 100;
      });
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className='container-site flex items-center justify-between'>
          {/* Logo */}
          <button
            onClick={() => scrollTo("inicio")}
            className='flex flex-col leading-none group'
          >
            <span
              className='text-2xl font-display tracking-widest text-gradient-gold'
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                letterSpacing: "0.12em",
              }}
            >
              EXPO BEAUTY
            </span>
            <span
              className='text-xs tracking-[0.3em] text-[#888] group-hover:text-[#C9A84C] transition-colors'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              & BARBER EMPRENDE 2026
            </span>
          </button>

          {/* Desktop links */}
          <ul className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <li key={link.to}>
                <button
                  onClick={() => scrollTo(link.to)}
                  className={`text-sm tracking-widest uppercase transition-all duration-200 relative pb-1 ${
                    active === link.to
                      ? "text-[#C9A84C]"
                      : "text-[#888] hover:text-[#F5F0E8]"
                  }`}
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500 }}
                >
                  {link.label}
                  {active === link.to && (
                    <motion.span
                      layoutId='nav-indicator'
                      className='absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C]'
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => scrollTo("contacto")}
            className='hidden md:block px-5 py-2 text-xs tracking-widest uppercase font-semibold border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-200'
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Quiero exponer
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='md:hidden text-[#F5F0E8] p-1'
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='fixed inset-0 z-40 bg-[#0A0A0A]/98 flex flex-col items-center justify-center gap-8 md:hidden'
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(link.to)}
                className='text-4xl tracking-widest text-[#F5F0E8] hover:text-[#C9A84C] transition-colors uppercase'
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo("contacto")}
              className='mt-4 px-8 py-3 bg-[#C9A84C] text-[#0A0A0A] font-semibold tracking-widest uppercase text-sm'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Quiero exponer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
