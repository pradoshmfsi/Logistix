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
});
