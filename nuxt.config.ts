// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
      components: { 
        include: ['Button', 'DataTable', 'Column', 'ColumnGroup', 'Row', 'IconField', 'InputIcon', 'InputText', 'Tag', 'Dropdown','Menubar', 'Message', 'ProgressSpinner', 'Toast']
      }
  },
  alias: {
    "@": resolve(__dirname, "/")
  },
  css: [ 'primevue/resources/themes/aura-light-green/theme.css', "~/assets/main.css",],
})
