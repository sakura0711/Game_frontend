import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StroyView from '../views/StoryView.vue'
import testView from '../views/testView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/story',
      name: 'story',
      component: StroyView,
    },
    {
      path: '/test',
      name: 'test',
      component: testView,
    }
  ]
})

export default router
