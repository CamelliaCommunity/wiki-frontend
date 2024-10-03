import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sentryVitePlugin } from "@sentry/vite-plugin"

import * as path from "path";

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
			'vue/server-renderer': path.resolve(__dirname, 'node_modules', '@vue', 'server-renderer', 'dist', 'server-renderer.esm-bundler.js'),
			'vue': path.resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.esm-bundler.js'),
		}
	};
	return {
		build,
		plugins,
		resolve,
		ssr: ["build"].includes(command)
	};
})