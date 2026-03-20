import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, MessageCircle, Send, CheckCircle, Loader2 } from "lucide-react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Replace with your real values:
const WHATSAPP_NUMBER = "521XXXXXXXXXX"; // e.g. 5215512345678
const CONTACT_EMAIL = "contacto@expobeautybarber.com";
// To receive form submissions by email, you can use EmailJS (free).
// Set your EmailJS keys here or leave empty to just use WhatsApp redirect:
const EMAILJS_SERVICE_ID = "";
const EMAILJS_TEMPLATE_ID = "";
const EMAILJS_PUBLIC_KEY = "";
// ─────────────────────────────────────────────────────────────────────────────

const productTypes = [
  "Productos capilares",
  "Barbería",
  "Maquillaje",
  "Uñas",
  "Estética",
  "Equipos y mobiliario",
  "Academia / Educación",
  "Otro",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const buildWhatsAppMessage = (data) =>
    `Hola, me interesa exponer en Expo Beauty & Barber 2026.%0A%0A*Nombre:* ${data.nombre}%0A*Empresa:* ${data.empresa}%0A*Teléfono:* ${data.telefono}%0A*Email:* ${data.email}%0A*Tipo de producto:* ${data.tipo_producto}`;

  const onSubmit = async (data) => {
    setStatus("sending");

    // Option 1: Send via EmailJS if configured
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        // Dynamically import emailjs only when needed
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: data.nombre,
            empresa: data.empresa,
            telefono: data.telefono,
            reply_to: data.email,
            tipo_producto: data.tipo_producto,
            mensaje: data.mensaje || "",
          },
          EMAILJS_PUBLIC_KEY,
        );
        setStatus("success");
        reset();
        return;
      } catch (err) {
        console.error("EmailJS error:", err);
        // Fall through to WhatsApp as backup
      }
    }

    // Option 2: Redirect to WhatsApp
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(data)}`;
    window.open(waUrl, "_blank");
    setStatus("success");
    reset();
  };

  return (
    <section
      ref={ref}
      className='py-32 bg-[#0D0D0D] border-t border-white/8 relative'
    >
      <div className='container-site'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className='text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4'
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            >
              Contacto
            </p>
            <h2
              className='text-[clamp(2.5rem,4vw,4rem)] text-[#F5F0E8] leading-tight mb-6'
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Solicita información
              <br />
              <span className='text-gradient-gold'>para exponer</span>
            </h2>
            <div className='section-divider mb-8' />
            <p
              className='text-[#777] text-sm leading-relaxed mb-10'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Completa el formulario y un asesor te contactará en menos de 24
              horas con toda la información de paquetes y disponibilidad de
              stands.
            </p>

            {/* Direct contact links */}
            <div className='space-y-4'>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className='flex items-center gap-4 group'
              >
                <div className='w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#C9A84C]/40 transition-colors'>
                  <Mail size={15} className='text-[#C9A84C]' />
                </div>
                <div>
                  <p
                    className='text-[#666] text-xs uppercase tracking-widest mb-0.5'
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Email
                  </p>
                  <p
                    className='text-[#ABABAB] text-sm group-hover:text-[#F5F0E8] transition-colors'
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 group'
              >
                <div className='w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#25D366]/40 transition-colors'>
                  <MessageCircle size={15} className='text-[#25D366]' />
                </div>
                <div>
                  <p
                    className='text-[#666] text-xs uppercase tracking-widest mb-0.5'
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    WhatsApp
                  </p>
                  <p
                    className='text-[#ABABAB] text-sm group-hover:text-[#F5F0E8] transition-colors'
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Ventas directas
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className='border border-white/10 bg-[#141414] p-12 text-center h-full flex flex-col items-center justify-center'
              >
                <CheckCircle size={40} className='text-[#C9A84C] mb-4' />
                <h3
                  className='text-2xl text-[#F5F0E8] mb-3'
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  ¡Mensaje enviado!
                </h3>
                <p
                  className='text-[#777] text-sm mb-6'
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Un asesor te contactará pronto.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className='text-[#C9A84C] text-xs tracking-widest uppercase hover:text-[#E8C96A] transition-colors'
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4 bg-[#111] border border-white/8 p-8 rounded-none'
              >
                {/* Name */}
                <div>
                  <input
                    {...register("nombre", { required: true })}
                    placeholder='Nombre completo *'
                    className={`w-full bg-[#0F0F0F] border px-5 py-4 text-sm text-[#F5F0E8] placeholder:text-[#555] focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#141414] transition-all ${
                      errors.nombre ? "border-[#E8407A]" : "border-white/12"
                    }`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  />
                </div>

                {/* Company */}
                <div>
                  <input
                    {...register("empresa", { required: true })}
                    placeholder='Empresa / Marca *'
                    className={`w-full bg-[#0F0F0F] border px-5 py-4 text-sm text-[#F5F0E8] placeholder:text-[#555] focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#141414] transition-all ${
                      errors.empresa ? "border-[#E8407A]" : "border-white/12"
                    }`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  />
                </div>

                {/* Phone + Email */}
                <div className='grid grid-cols-2 gap-4'>
                  <input
                    {...register("telefono", { required: true })}
                    placeholder='Teléfono *'
                    className={`w-full bg-[#0F0F0F] border px-5 py-4 text-sm text-[#F5F0E8] placeholder:text-[#555] focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#141414] transition-all ${
                      errors.telefono ? "border-[#E8407A]" : "border-white/12"
                    }`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  />
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/,
                    })}
                    placeholder='Email *'
                    type='email'
                    className={`w-full bg-[#0F0F0F] border px-5 py-4 text-sm text-[#F5F0E8] placeholder:text-[#555] focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#141414] transition-all ${
                      errors.email ? "border-[#E8407A]" : "border-white/12"
                    }`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  />
                </div>

                {/* Product type */}
                <div>
                  <select
                    {...register("tipo_producto", { required: true })}
                    className={`w-full bg-[#0F0F0F] border px-5 py-4 text-sm text-[#ABABAB] focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#141414] transition-all appearance-none cursor-pointer ${
                      errors.tipo_producto
                        ? "border-[#E8407A]"
                        : "border-white/12"
                    }`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <option value=''>Tipo de producto / servicio *</option>
                    {productTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message (optional) */}
                <div>
                  <textarea
                    {...register("mensaje")}
                    placeholder='Mensaje (opcional)'
                    rows={3}
                    className='w-full bg-[#0F0F0F] border border-white/10 px-5 py-4 text-sm text-[#F5F0E8] placeholder:text-[#555] focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#141414] transition-all resize-none'
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  />
                </div>

                {/* Submit */}
                <button
                  type='submit'
                  disabled={status === "sending"}
                  className='w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C96A] disabled:opacity-60 transition-all duration-200 active:scale-[0.98]'
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className='animate-spin' /> Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Solicitar información
                    </>
                  )}
                </button>

                <p
                  className='text-[#333] text-xs text-center'
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Al enviar aceptas nuestra{" "}
                  <a
                    href='#'
                    className='text-[#777] hover:text-[#ABABAB] transition-colors'
                  >
                    Política de Privacidad
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
