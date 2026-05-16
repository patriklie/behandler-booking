import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      workbox: {
        skipWaiting: true
      },
      manifest: {
        name: 'HelseBooking',
        short_name: 'HelseBooking',
        description: 'En fullstack bookingapplikasjon for helsetjenester der pasienter kan finne og booke time hos behandlere.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/HelseBooking_android_app.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/HelseBooking_android_app.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/HelseBooking_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/HelseBooking_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/android_pwa_mobil_loading.png',
            sizes: '1290x2796',
            type: 'image/png',
            label: 'HelseBooking mobilvisning'
          },
          {
            src: '/screenshots/desktop_loading.png',
            sizes: '2560x1500',
            type: 'image/png',
            form_factor: 'wide',
            label: 'HelseBooking desktopvisning'
          }
        ]
      }
    })
  ],
})