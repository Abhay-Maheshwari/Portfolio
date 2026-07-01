import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: false,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['gsap', '@gsap/react'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Use esbuild for minification (faster than terser)
    minify: 'esbuild',
    // Target modern browsers for smaller output
    target: 'es2020',
    // Disable source maps in production
    sourcemap: false,
    // Split CSS per chunk
    cssCodeSplit: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
  },

  // Performance improvements
  server: {
    allowedHosts: true, // Allow any host (e.g. ngrok tunnels)
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
});
