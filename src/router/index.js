import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ArticleView from '../views/article/ArticleView.vue'
import oauthComplete from '../views/oauthComplete.vue'

export const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/oauthComplete',
		name: 'oauthComplete',
		component: oauthComplete
	},
	{ // redirect everything else to article
		path: '/:pathMatch(.*)*',
		component: ArticleView
	}
];

const router = createRouter({
  history: import.meta.env.SSR
  	? createMemoryHistory(import.meta.env.BASE_URL)
	: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return { top: 0 }
  }
})

export default router;