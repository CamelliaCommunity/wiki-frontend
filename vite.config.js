import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sentryVitePlugin } from "@sentry/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview}) => {
	const build = {
		bourcemap: true,
		checkSizeWarningLimit: 10000
	};
	const plugins = [
		vue(), // Vue plugin

		// Sentry
		sentryVitePlugin({
			url: "https://sentry.flux.moe",
			org: "choccymilk",
			project: "camellia-wiki",
			authToken: process.env.SENTRY_AUTH_TOKEN
		})
	];
	const resolve = {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		}
	};
	if (["build"].includes(command)) {
		return {
			build,
			plugins,
			resolve,
			ssr: true
		}
	} else {
		return {
			build,
			plugins,
			resolve: {
				alias: {
				...resolve.alias,
				'vue': "vue/dist/vue.esm-bundler.js"
				}
			}
		}
	}
})