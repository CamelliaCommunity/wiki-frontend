import './assets/style/main.scss'
import './assets/style/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Plugins
import 'vue3-toastify/dist/index.css';
import * as Sentry from "@sentry/vue";

const environment = (import.meta.env?.PROD == false) ? "development" : "production";

// To stop exploding Sentry with errors we already will know...
// tracesSampleRate was 1.0 but is now 0
// replaysSessionSampleRate was 0.1 but is now 0
Sentry.init({
  app,
  environment,
  dsn: "https://eb80b3d62eb928b250cd8af2d048a5c8@sentry.flux.moe/3",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  enableTracing: (environment == "production"),
  // Performance Monitoring
  tracesSampleRate: (environment == "development") ? 0 : 0.5, //  Capture % (* 100) of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [/^https:\/\/camellia\.wiki\//],
  // Session Replay
  replaysSessionSampleRate: (environment == "development") ? 0 : 0.1,
  replaysOnErrorSampleRate: 1.0
});

app.mount('#app')
