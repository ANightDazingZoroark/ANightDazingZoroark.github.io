import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { markdownPages } from './plugins/markdownPages.js'

export default defineConfig({
    plugins: [
        react(),
        markdownPages()
    ]
})