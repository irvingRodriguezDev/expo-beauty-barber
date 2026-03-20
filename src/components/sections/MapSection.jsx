import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, ExternalLink } from "lucide-react";

export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className='py-24 bg-[#0A0A0A]'>
      <div className='container-site'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <p
            className='text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4'
            style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
          >
            Sede del evento
          </p>
          <h2
            className='text-[clamp(2rem,4vw,3.5rem)] text-[#F5F0E8] mb-4'
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            WTC Ciudad de México
          </h2>
          <p
            className='text-[#555] text-sm flex items-center justify-center gap-2'
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <MapPin size={12} className='text-[#E8407A]' />
            Montecito 38, Col. Nápoles, CDMX
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='relative'
        >
          <div className='aspect-[16/7] overflow-hidden border border-white/10'>
            <iframe
              title='WTC Ciudad de México'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0585258397654!2d-99.17808512394628!3d19.389218981879734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4601a5785f%3A0x2553d5a4c3e39b09!2sWorld%20Trade%20Center%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1710000000000'
              width='100%'
              height='100%'
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>

          {/* Info card overlay */}
          <div className='absolute bottom-6 left-6 bg-[#0A0A0A]/95 border border-white/10 backdrop-blur-sm p-5 max-w-xs'>
            <h3
              className='text-[#F5F0E8] font-semibold mb-1 text-sm'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              World Trade Center CDMX
            </h3>
            <p
              className='text-[#555] text-xs mb-3'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Montecito 38, Nápoles, Benito Juárez
            </p>
            <a
              href='https://goo.gl/maps/WTC_CDMX'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-[#C9A84C] text-xs hover:text-[#E8C96A] transition-colors'
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500 }}
            >
              <ExternalLink size={11} /> Ver en Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
