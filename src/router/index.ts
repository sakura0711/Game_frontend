import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StroyView from '../views/StoryView.vue'
import WeaponsView from '../views/WeaponsView.vue'

import AttackSkillView from '../views/AttackSkillView.vue'
import DefendSkillView from '../views/DefenseSkillsView.vue'
import SupportSkillView from '@/views/SupportSkillView.vue'


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
      path: '/Weapons',
      name: 'Weapons',
      component: WeaponsView,
    },
    {
      path: '/attackSkill',
      name: 'attackSkill',
      component: AttackSkillView,
    },
    {
      path: '/defendSkill',
      name: 'defendSkill',
      component: DefendSkillView,
    },
    {
      path: '/supportSkill',
      name: 'supportSkill',
      component: SupportSkillView,
    }
  ]
})

export default router
