import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Configura la base como './' para que las rutas relativas funcionen correctamente
  plugins: [react()]
});
