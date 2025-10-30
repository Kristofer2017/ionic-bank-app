import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import HomePage from '@/pages/HomePage.vue';
import TransferPage from '@/pages/TransferPage.vue';
import ServicesPage from '@/pages/ServicesPage.vue';
import SendPage from '@/pages/SendPage.vue';
import TopupPage from '@/pages/TopupPage.vue';
import PayPage from '@/pages/PayPage.vue';
import MethodsPage from '@/pages/MethodsPage.vue';
import TabsLayout from '@/layouts/TabsLayout.vue';
import SidebarLayout from '@/layouts/SidebarLayout.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { 
    path: '/',
    component: TabsLayout,
    children: [
      { path: 'home', component: HomePage },
      { path: 'transfer', component: TransferPage },
      { path: 'services', component: ServicesPage },
    ],
  },
  { 
    path: '/transfer',
    component: SidebarLayout,
    children: [
      { path: 'send', component: SendPage },
      { path: 'topup', component: TopupPage },
    ],
  },
  { 
    path: '/services',
    component: SidebarLayout,
    children: [
      { path: 'pay', component: PayPage },
      { path: 'methods', component: MethodsPage },
    ],
  },

]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export default router
