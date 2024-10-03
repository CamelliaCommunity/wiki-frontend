import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import NewsView from '../views/news/NewsView.vue'
import SettingsView from '../views/settings/SettingsView.vue';
import PollsView from '../views/polls/PollsView.vue';
import ArticleView from '../views/article/ArticleView.vue';
import oauthComplete from '../views/oauthComplete.vue';

const router = createRouter({
	history: import.meta.env.SSR
		? createMemoryHistory(import.meta.env.BASE_URL)
		: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/news',
			name: 'news',
			component: NewsView
		},
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/polls',
      name: 'polls',
      component: PollsView
    },
    {
      path: '/polls/:id',
      name: 'poll',
      component: PollsView
    },
	  {
      path: '/oauthComplete',
      name: 'oauthComplete',
      component: oauthComplete
	  },
	  { // redirect everything else to article
      path: '/:pathMatch(.*)*',
      component: ArticleView
    },
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { top: 0 }
  }
});

export default router;
