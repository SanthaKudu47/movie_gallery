import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts:[ "5cdd-2405-1200-4193-1f00-c442-805-c368-ccde.ngrok-free.app"],
    
  },
});
