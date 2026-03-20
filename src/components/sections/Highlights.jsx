import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Scissors,
  Sparkles,
  Mic2,
  ShoppingBag,
  Camera,
  Users,
} from "lucide-react";

const items = [
  {
    icon: Scissors,
    label: "Stands comerciales",
    desc: "Expositores con los mejores productos del sector.",
  },
  {
    icon: Sparkles,
    label: "Demostraciones en vivo",
    desc: "Técnicas y productos presentados en tiempo real.",
  },
  {
    icon: Scissors,
    label: "Barber Shows",
    desc: "Los mejores barberos en escena.",
  },
  {
    icon: Sparkles,
    label: "Zona de maquillaje",
    desc: "Arte y tendencias del maquillaje profesional.",
  },
  {
    icon: Mic2,
    label: "Talleres y conferencias",
    desc: "Aprende de los referentes de la industria.",
  },
  {
    icon: Users,
    label: "Networking con marcas",
    desc: "Conecta con distribuidores y compradores.",
  },
  {
    icon: ShoppingBag,
    label: "Marketplace profesional",
    desc: "Compra y negocia directamente con marcas.",
  },
  {
    icon: Camera,
    label: "Contenido para redes",
    desc: "Fotobooth y zonas para crear contenido.",
  },
];

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className='py-32 bg-[#0A0A0A] relative overflow-hidden'>
      {/* Background texture */}
      <div
        className='absolute inset-0 opacity-[0.015]'
        style={{
          backgroundImage:
            "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className='container-site relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <p
            className='text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4'
            style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
          >
            Lo que encontrarás
          </p>
          <h2
            className='text-[clamp(2.5rem,5vw,4.5rem)] text-[#F5F0E8]'
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Una experiencia completa
          </h2>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className='bg-[#141414] border border-white/8 p-8 group hover:bg-[#1C1C1C] hover:border-[#C9A84C]/30 transition-all duration-300 cursor-default'
            >
              <div className='w-9 h-9 bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-5 group-hover:bg-[#C9A84C]/20 transition-colors'>
                <item.icon
                  size={17}
                  className='text-[#C9A84C] group-hover:scale-110 transition-transform duration-300'
                />
              </div>
              <h3
                className='text-[#F0EAD6] text-sm font-semibold mb-2 group-hover:text-[#C9A84C] transition-colors'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {item.label}
              </h3>
              <p
                className='text-[#ABABAB] text-xs leading-relaxed'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
