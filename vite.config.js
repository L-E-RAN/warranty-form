import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // חשוב מאוד כדי שיטעין את הקבצים נכון גם ב־Vercel
})
