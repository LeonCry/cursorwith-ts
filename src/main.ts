import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Request from './utils/request';

declare const __APP_VERSION__: string;
const app = createApp(App).use(router).use(createPinia());
app.mount('#app');
const req = new Request({ prefixUrl: `/${import.meta.env.VITE_APP_ROUTER_PREFIX}` });
router.beforeEach(() => {
  const { DEV } = import.meta.env;
  if (DEV) return;
  req.GET<{ version: string }>(`/version.json?t=${Date.now()}`)
    .then(({ data }) => {
      const version = data.version;
      if (!version || typeof __APP_VERSION__ === 'undefined') return;
      if (__APP_VERSION__ === version) return;
      const target = new URL(location.href);
      target.searchParams.set('time', Date.now().toString());
      location.href = target.toString();
    })
    .catch((error) => {
      console.warn(String(error));
    });
});
