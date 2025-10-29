import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LayoutTabs from '../layouts/LayoutTabs.vue';
import LayoutSidebar from '../layouts/LayoutSidebar.vue';
import LoginPage from '../pages/login/LoginPage.vue';
import RegisterPage from '../pages/login/RegisterPage.vue';
import HomePage from '../pages/principales/HomePage.vue';
import TransferPage from '../pages/principales/TransferPage.vue';
import ServicesPage from '../pages/principales/ServicesPage.vue';
import TransferirFondos from '../pages/transferir/TransferirFondos.vue';
import RecargarCuenta from '../pages/transferir/RecargarCuenta.vue';
import PagarServicios from '../pages/servicios/PagarServicios.vue';
import MetodosPago from '../pages/servicios/MetodosPago.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/',
    component: LayoutTabs,
    children: [
      { path: 'home', component: HomePage },
      { path: 'transfer', component: TransferPage },
      { path: 'services', component: ServicesPage },
    ],
  },
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
