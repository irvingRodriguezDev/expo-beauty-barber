import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync("./localhost-key.pem"),
    //   cert: fs.readFileSync("./localhost.pem"),
    // },
    allowedHosts: ["excogitable-mavis-sulfureous.ngrok-free.dev"],
    port: 5173,
  },
});
