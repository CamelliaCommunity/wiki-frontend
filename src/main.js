import { createSSRApp } from "vue";
import App from "./App.vue";
import router from "./router";

import './assets/style/main.scss';
import './assets/style/tailwind.css';

// Plugin import
// -- Cookies
import VueCookies from 'vue-cookies'
// -- Toastify
import 'vue3-toastify/dist/index.css';
// -- Sentry
import * as Sentry from '@sentry/vue';
// -- Overlay Scrollbars (Vue)
import 'overlayscrollbars/overlayscrollbars.css';
// -- Vue Unhead?
import { createHead } from '@unhead/vue';

export function createApp(config) {
	let isProduction = config?.isProduction ?? true; // assume we are always in production unless otherwise.

	const app = createSSRApp(App);

	// Plugin config
	// -- Cookies
	// default options config: { expires: '1d', path: '/', domain: '', secure: '',
	// sameSite: 'Lax' , partitioned: false}
	app.use(VueCookies, {expires: '7d', path: '/'});

	// -- Vue-Router
	app.use(router);

	// -- Vue Unhead
	const head = createHead();
	app.use(head);

	// -- Sentry
	// To stop exploding Sentry with errors we already will know...
	// tracesSampleRate was 1.0 but is now 0
	// replaysSessionSampleRate was 0.1 but is now 0
	Sentry.init({
		app,
		environment: !isProduction ? "development" : "production",
		dsn: 'https://eb80b3d62eb928b250cd8af2d048a5c8@sentry.flux.moe/3',
		integrations: [
			Sentry.browserTracingIntegration(),
			Sentry.replayIntegration(),
		],
		enableTracing: isProduction,
		// Performance Monitoring
		tracesSampleRate: !isProduction ?
			0 :
			0.5,  //  Capture % (* 100) of the transactions
		// Set 'tracePropagationTargets' to control for which URLs distributed tracing
		// should be enabled
		tracePropagationTargets: [/^https:\/\/camellia\.wiki\//],
		// Session Replay
		replaysSessionSampleRate: !isProduction ? 0 : 0.1,
		replaysOnErrorSampleRate: 1.0
	});

	return { app, router, head };
};