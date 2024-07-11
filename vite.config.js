import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sentryVitePlugin } from "@sentry/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 10000
	},
	plugins: [
		vue(),

		// Sentry
		sentryVitePlugin({
			url: "https://sentry.flux.moe",
			org: "choccymilk",
			project: "camellia-wiki",
			authToken: process.env.SENTRY_AUTH_TOKEN
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'vue': "vue/dist/vue.esm-bundler.js"
		}
	}
})
