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
  Ticket,
} from "lucide-react";

const perks = [
  { icon: Scissors, label: "Barber Shows en vivo" },
  { icon: Sparkles, label: "Zona de maquillaje profesional" },
  { icon: Mic2, label: "Conferencias con expertos" },
  { icon: ShoppingBag, label: "Productos y ofertas exclusivas" },
  { icon: Camera, label: "Contenido para redes sociales" },
  { icon: Users, label: "Networking con profesionales" },
];

const profiles = [
  "Profesionales de la belleza",
  "Barberos",
  "Maquilladores",
  "Estudiantes de academias",
  "Dueños de salones",
  "Distribuidores",
  "Emprendedores del sector",
];

export default function Visitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className='py-32 bg-[#0D0D0D] border-t border-white/8 relative'
    >
      <div className='container-site'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='mb-20'
        >
          <p
            className='text-[#E8407A] text-xs tracking-[0.35em] uppercase mb-4'
            style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
          >
            Sección visitantes
          </p>
          <h2
            className='text-[clamp(2.5rem,5vw,4.5rem)] text-[#F5F0E8] leading-tight'
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Vive la experiencia
            <br />
            <span style={{ color: "#E8407A" }}>Expo Beauty & Barber</span>
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
          {/* Left: image + description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className='aspect-[4/3] overflow-hidden mb-8 relative'>
              {/* Replace with real image */}
              <img
                src='https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80'
                alt='Visitantes'
                className='w-full h-full object-cover opacity-60'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent' />
            </div>

            <p
              className='text-[#ABABAB] text-base leading-relaxed mb-8'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Durante <span className='text-[#F5F0E8]'>3 días</span> podrás
              conocer las últimas tendencias, productos y técnicas de la
              industria de la belleza y barbería.
            </p>

            {/* Perks grid */}
            <div className='grid grid-cols-2 gap-3'>
              {perks.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className='flex items-center gap-3 py-3 border-b border-white/5'
                >
                  <p.icon size={13} className='text-[#E8407A] shrink-0' />
                  <span
                    className='text-[#ABABAB] text-xs'
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: date, audience, CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Date badge */}
            <div className='border border-white/10 p-8 mb-8 bg-[#141414] relative overflow-hidden'>
              <div
                className='absolute top-0 right-0 w-32 h-32 rounded-full opacity-10'
                style={{
                  background: "radial-gradient(circle, #E8407A, transparent)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <p
                className='text-[#777] text-xs tracking-widest uppercase mb-2'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Fecha y sede
              </p>
              <p
                className='text-[5rem] leading-none text-[#F5F0E8] mb-0'
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                14–16
              </p>
              <p
                className='text-2xl text-[#E8407A] tracking-widest uppercase'
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Marzo 2026
              </p>
              <p
                className='text-[#777] text-sm mt-2'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                WTC Ciudad de México
              </p>
            </div>

            {/* Who should attend */}
            <div className='mb-8'>
              <p
                className='text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4'
                style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
              >
                ¿Quién debería asistir?
              </p>
              <div className='flex flex-wrap gap-2'>
                {profiles.map((p, i) => (
                  <span
                    key={i}
                    className='px-3 py-1 border border-white/10 text-[#ABABAB] text-xs'
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href='#contacto'
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contacto")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className='inline-flex items-center gap-3 w-full justify-center px-8 py-5 bg-[#E8407A] text-white font-semibold text-sm tracking-widest uppercase hover:bg-[#C02060] transition-all duration-200 active:scale-95'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <Ticket size={16} />
              Registrarme como visitante
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
