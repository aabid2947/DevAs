import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // Ensure this is imported

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Map '@' to the 'src' directory
    },
  },
});
