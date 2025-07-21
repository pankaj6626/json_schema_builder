import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'crypto'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
