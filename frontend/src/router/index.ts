import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import HomePage from '@/pages/HomePage.vue';
import TransferPage from '@/pages/TransferPage.vue';
import ServicesPage from '@/pages/ServicesPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { 
    path: '/',
    component: MainLayout,
    children: [
      { path: 'home', component: HomePage },
      { path: 'transfer', component: TransferPage },
      { path: 'services', component: ServicesPage },
    ],
  }
]

const router = createRouter({ 
  history: createWebHistory(import.meta.env.BASE_URL), routes 
})

export default router
