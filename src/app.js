import { createSSRApp, h } from "vue";
import "./assets/styles/main.scss";
import PageLayout from "./PageLayout.vue";
import vuetify from "./vuetify";
import { createStore } from "./store";
import { createRouter } from "./router/index.js";
export { createApp };

function createApp(pageContext) {
  const { Page, pageProps } = pageContext;
  const PageWithLayout = {
    render() {
      return h(
        PageLayout,
        {},
        {
          default() {
            return h(Page, pageProps || {});
          },
        }
      );
    },
  };
  const router = createRouter();
  const store = createStore();
  const app = createSSRApp(PageWithLayout);
  app.use(vuetify);
  app.use(store);
  app.use(router);

  return app;
}
