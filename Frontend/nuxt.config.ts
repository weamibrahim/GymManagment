export default defineNuxtConfig({
  css: ["@/assets/main.css"],
  
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // app: {
  //   pageTransition: { name: "page", mode: "in-out" },
  // },
  build: {
    transpile: ['@headlessui/vue','@fortawesome/vue-fontawesome'],

  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
  
    { src: '~/plugins/fontawesome.client.js', mode: 'client' },
    { src: "~/plugins/axios.js" },
    { src: '~/plugins/barcode.client.js', mode: 'client' },
    { src: '~/plugins/formatDate.client.js' },
    { src: '~/plugins/toast.client.js', mode: 'client' },
   

 
  ],


});
