export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process. env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },
  app: {
    head: {
      title: 'Orientation Collégiens',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Application d\'orientation professionnelle pour collégiens' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
