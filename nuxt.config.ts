// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/css/custom.css","@fortawesome/fontawesome-svg-core/styles.css"],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/google-fonts"],

  runtimeConfig: {
    public: {
      apiUrl: process.env.STRAPI_API_URL,
      apiKey: process.env.STRAPI_API_KEY,
    },
  },

  googleFonts: {
    display: "swap",
    prefetch: true,
    families: {
      "Proxima Nova": [200, 300, 400, 500, 600],
    },
  },
});
