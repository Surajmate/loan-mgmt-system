import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {

    proxy: {

      '/api': {

        target:
          'https://loan-mgmt-system.onrender.com',

        changeOrigin: true,
      },
    },
  },
})