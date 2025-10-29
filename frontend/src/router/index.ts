import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import HomePage from '../views/HomePage.vue';
import TransferPage from '../views/TransferPage.vue';
import ServicesPage from '../views/ServicesPage.vue';
import TransferirFondos from '../views/TransferirFondos.vue';
import RecargarCuenta from '../views/RecargarCuenta.vue';
import PagarServicios from '../views/PagarServicios.vue';
import MetodosPago from '../views/MetodosPago.vue';
import LayoutTabs from '../layouts/LayoutTabs.vue';
import LayoutSidebar from '../layouts/LayoutSidebar.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },

  // Routes without Layout
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },

  // Layout Sidebar + Tabs
  { path: '/',
    component: LayoutTabs,
    children: [
      { path: 'home', component: HomePage },
      { path: 'transfer', component: TransferPage },
      { path: 'services', component: ServicesPage },
    ],
  },
  
  // Layout Sidebar Only
  { path: '/transfer',
    component: LayoutSidebar,
    children: [
      { path: 'send', component: TransferirFondos },
      { path: 'topup', component: RecargarCuenta },
    ],
  },
  { path: '/services',
    component: LayoutSidebar,
    children: [
      { path: 'pay', component: PagarServicios },
      { path: 'methods', component: MetodosPago },
    ],
  },
]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export default router
