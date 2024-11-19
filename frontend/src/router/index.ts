import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Used to display the feedback modal
    {
      path: '/feedback/new',
      name: 'newFeedback',
      component: HomeView,
    },
  ],
})

export default router
