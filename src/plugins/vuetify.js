// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

import { fa } from 'vuetify/locale'

export default createVuetify({
  locale: {
    locale: 'fa',
    messages: { fa }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#ffffff",
          secondary: "#000000",
        },
      },
    },
  },
});