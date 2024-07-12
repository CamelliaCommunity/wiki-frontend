import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ArticleView from '../views/article/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, { // redirect everything else to article
      path: '/:pathMatch(.*)*',
      component: ArticleView
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { top: 0 }
  }
})

export default router
