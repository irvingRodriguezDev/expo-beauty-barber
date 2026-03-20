import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className='bg-[#0A0A0A] border-t border-white/5 pt-16 pb-8'>
      <div className='container-site'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
          {/* Brand */}
          <div>
            <h3
              className='text-3xl text-gradient-gold mb-3'
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              Expo Beauty
              <br />& Barber Emprende
            </h3>
            <p
              className='text-[#888] text-sm leading-relaxed'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              El punto de encuentro para la industria de la belleza, barbería y
              maquillaje en México.
            </p>
            <p
              className='text-[#555] text-xs mt-4 tracking-widest uppercase'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Organizado por Publicidad Mahur
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4
              className='text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-6'
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            >
              Contacto
            </h4>
            <ul className='space-y-3'>
              <li
                className='flex items-center gap-3 text-[#888] text-sm'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <Mail size={14} className='text-[#C9A84C] shrink-0' />
                contacto@expobeautybarber.com
              </li>
              <li
                className='flex items-center gap-3 text-[#888] text-sm'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <Phone size={14} className='text-[#C9A84C] shrink-0' />
                WhatsApp Ventas
              </li>
              <li
                className='flex items-start gap-3 text-[#888] text-sm'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <MapPin size={14} className='text-[#C9A84C] shrink-0 mt-0.5' />
                WTC Ciudad de México
                <br />
                Montecito 38, Nápoles
              </li>
            </ul>
          </div>

          {/* Sede */}
          <div>
            <h4
              className='text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-6'
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            >
              Fecha y sede
            </h4>
            <p
              className='text-5xl text-[#F5F0E8] leading-none mb-2'
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              14–16
            </p>
            <p
              className='text-lg text-[#888] tracking-widest uppercase'
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Marzo 2026
            </p>
            <div className='flex gap-4 mt-6'>
              <a
                href='#'
                className='w-8 h-8 border border-white/10 flex items-center justify-center text-[#888] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all'
              >
                <Instagram size={14} />
              </a>
              <a
                href='#'
                className='w-8 h-8 border border-white/10 flex items-center justify-center text-[#888] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all'
              >
                <Facebook size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p
            className='text-[#444] text-xs'
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            © 2026 Expo Beauty & Barber Emprende. Todos los derechos reservados.
          </p>
          <a
            href='#'
            className='text-[#444] text-xs hover:text-[#888] transition-colors'
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
