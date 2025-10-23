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

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/transfer',
    component: TransferPage
  },
  {
    path: '/services',
    component: ServicesPage
  },
  {
    path: '/transferir-fondos',
    component: TransferirFondos
  },
  {
    path: '/recargar-cuenta',
    component: RecargarCuenta
  },
  {
    path: '/pagar-servicios',
    component: PagarServicios
  },
  {
    path: '/metodos-pago',
    component: MetodosPago
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
