# Expo Beauty & Barber Emprende 2027

Sitio web oficial para la expo de belleza, barbería y maquillaje en México.

**Stack:** React 18 + Vite 5 + Tailwind CSS v4 + Framer Motion

---

## 🚀 Instalación y arranque

```bash
# 1. Clona o entra a la carpeta
cd expo-beauty-barber

# 2. Instala dependencias
npm install

# 3. Corre en desarrollo
npm run dev

# 4. Build de producción
npm run build
```

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        ← Navegación fija con scroll spy
│   │   └── Footer.jsx        ← Pie de página
│   └── sections/
│       ├── Hero.jsx          ← Banner principal
│       ├── AboutEvent.jsx    ← Sobre el evento
│       ├── Highlights.jsx    ← Lo que encontrarás
│       ├── Stats.jsx         ← Contadores animados
│       ├── MapSection.jsx    ← Mapa WTC
│       ├── Visitors.jsx      ← Sección visitantes
│       ├── Exhibitors.jsx    ← Sección expositores
│       └── Contact.jsx       ← Formulario de contacto
├── App.jsx
├── main.jsx
└── index.css                 ← Design tokens y utilidades globales
```

---

## ⚙️ Configuración del formulario de contacto

Abre `src/components/sections/Contact.jsx` y edita las constantes al inicio:

```js
const WHATSAPP_NUMBER = "521XXXXXXXXXX"; // Tu número con código de país
const CONTACT_EMAIL = "tu@email.com";
```

### Opción A — Solo WhatsApp (funciona sin backend)

Deja `EMAILJS_SERVICE_ID` vacío. El formulario redireccionará directo a WhatsApp con los datos precargados.

### Opción B — Email con EmailJS (gratis hasta 200 envíos/mes)

1. Crea cuenta en [emailjs.com](https://emailjs.com)
2. Crea un **Service** (Gmail, Outlook, etc.)
3. Crea un **Template** con variables: `from_name`, `empresa`, `telefono`, `reply_to`, `tipo_producto`, `mensaje`
4. Instala: `npm install @emailjs/browser`
5. Llena las constantes:

```js
const EMAILJS_SERVICE_ID = "service_XXXXXX";
const EMAILJS_TEMPLATE_ID = "template_XXXXXX";
const EMAILJS_PUBLIC_KEY = "xxxxxxxxxxxxxx";
```

---

## 🖼️ Imágenes reales

Busca `images.unsplash.com` en los componentes y reemplaza con tus fotos reales del evento.

Archivos a editar:

- `Hero.jsx` → foto de fondo del banner
- `AboutEvent.jsx` → foto lateral
- `Visitors.jsx` → foto sección visitantes
- `Exhibitors.jsx` → foto stands

Coloca tus imágenes en `public/images/` y referencia como `/images/foto.jpg`

---

## 🎨 Paleta de colores

| Variable     | Valor     | Uso                |
| ------------ | --------- | ------------------ |
| `gold`       | `#C9A84C` | Acento principal   |
| `gold-light` | `#E8C96A` | Hover estados      |
| `rose`       | `#E8407A` | Sección visitantes |
| `dark`       | `#0A0A0A` | Fondo base         |
| `light`      | `#F5F0E8` | Texto principal    |

---

## 🚢 Deploy

Recomendamos **Vercel** (gratis):

```bash
npm install -g vercel
vercel
```

O **Netlify**: arrastra la carpeta `dist/` después de `npm run build`.
