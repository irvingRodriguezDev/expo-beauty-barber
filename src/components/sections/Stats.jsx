import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <span ref={ref}>
      <motion.span>
        {useTransform(count, (v) => Math.round(v).toLocaleString())}
      </motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 5000, suffix: "+", label: "Visitantes estimados" },
  { value: 3, suffix: "", label: "Días de actividades" },
  { value: 50, suffix: "+", label: "Marcas participantes" },
  { value: 20, suffix: "+", label: "Demos y talleres" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className='py-20 bg-[#0D0D0D] border-y border-white/5 relative overflow-hidden'
    >
      {/* Rose accent line */}
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8407A]/40 to-transparent' />

      <div className='container-site'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/5'>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className='text-center px-6'
            >
              <div
                className='text-[clamp(3rem,6vw,5.5rem)] leading-none text-gradient-gold mb-2'
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <p
                className='text-[#555] text-xs tracking-widest uppercase'
                style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent' />
    </section>
  );
}
