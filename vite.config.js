import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Esto es correcto para ngrok
    allowedHosts: [
      "excogitable-mavis-sulfureous.ngrok-free.dev",
      "varmint-clamor-percolate.ngrok-free.dev",
    ],
    port: 5173,
    strictPort: true, // Te recomiendo añadir esto para que no salte al 5174 si el puerto se traba
  },
});
