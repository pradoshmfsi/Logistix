import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      'dayjs',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip',
      '@mui/icons-material',
    ],
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // Needed for Docker container port mapping to work
    strictPort: true,
    port: 3000, // Port for development server
  },
  preview: {
    port: 5008, // Port for preview server
  },
});
