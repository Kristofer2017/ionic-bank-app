import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import HomePage from '@/pages/HomePage.vue';
import TransferPage from '@/pages/TransferPage.vue';
import ServicesPage from '@/pages/ServicesPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import UserService from "@/api/UserService";

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { 
    path: '/',
    component: MainLayout,
    children: [
      { path: 'home', component: HomePage, meta: { requiresAuth: true } },
      { path: 'transfer', component: TransferPage, meta: { requiresAuth: true } },
      { path: 'services', component: ServicesPage, meta: { requiresAuth: true } },
    ],
  }
]

const router = createRouter({ 
  history: createWebHistory(import.meta.env.BASE_URL), routes 
})

router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresAuth) return next();

    const isAuth = await UserService.checkSession();
    if (isAuth) return next();

    next('/login');
});

export default router;
