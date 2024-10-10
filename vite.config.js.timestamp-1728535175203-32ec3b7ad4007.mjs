// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/dev/webprogramming2/wiki-frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/dev/webprogramming2/wiki-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { sentryVitePlugin } from "file:///E:/dev/webprogramming2/wiki-frontend/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
var __vite_injected_original_import_meta_url = "file:///E:/dev/webprogramming2/wiki-frontend/vite.config.js";
var vite_config_default = defineConfig({
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1e4
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
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "vue": "vue/dist/vue.esm-bundler.js"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxkZXZcXFxcd2VicHJvZ3JhbW1pbmcyXFxcXHdpa2ktZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGRldlxcXFx3ZWJwcm9ncmFtbWluZzJcXFxcd2lraS1mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovZGV2L3dlYnByb2dyYW1taW5nMi93aWtpLWZyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IHNlbnRyeVZpdGVQbHVnaW4gfSBmcm9tIFwiQHNlbnRyeS92aXRlLXBsdWdpblwiXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRidWlsZDoge1xuXHRcdHNvdXJjZW1hcDogdHJ1ZSxcblx0XHRjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAwXG5cdH0sXG5cdHBsdWdpbnM6IFtcblx0XHR2dWUoKSxcblxuXHRcdC8vIFNlbnRyeVxuXHRcdHNlbnRyeVZpdGVQbHVnaW4oe1xuXHRcdFx0dXJsOiBcImh0dHBzOi8vc2VudHJ5LmZsdXgubW9lXCIsXG5cdFx0XHRvcmc6IFwiY2hvY2N5bWlsa1wiLFxuXHRcdFx0cHJvamVjdDogXCJjYW1lbGxpYS13aWtpXCIsXG5cdFx0XHRhdXRoVG9rZW46IHByb2Nlc3MuZW52LlNFTlRSWV9BVVRIX1RPS0VOXG5cdFx0fSlcblx0XSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHQnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdCd2dWUnOiBcInZ1ZS9kaXN0L3Z1ZS5lc20tYnVuZGxlci5qc1wiXG5cdFx0fVxuXHR9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLGVBQWUsV0FBVztBQUV6VSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsU0FBUyx3QkFBd0I7QUFKc0osSUFBTSwyQ0FBMkM7QUFPeE8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsT0FBTztBQUFBLElBQ04sV0FBVztBQUFBLElBQ1gsdUJBQXVCO0FBQUEsRUFDeEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLElBQUk7QUFBQTtBQUFBLElBR0osaUJBQWlCO0FBQUEsTUFDaEIsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsU0FBUztBQUFBLE1BQ1QsV0FBVyxRQUFRLElBQUk7QUFBQSxJQUN4QixDQUFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUNwRCxPQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
