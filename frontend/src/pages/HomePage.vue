<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inicio</ion-title>
        <NotificationBell />
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <ion-list class="tarjeta">
        <ion-list-header>
          <ion-label>
            <h1>Bienvenido/a, {{ usuario?.nombre.split(' ')[0] }}.</h1>
            <h2>Número de cuenta: {{ usuario?.cuenta.numero }}</h2>
          </ion-label>
        </ion-list-header>
      </ion-list>
      <ion-list class="tarjeta">
        <ion-list-header>
          <ion-label>
            <h1>Saldo Disponible</h1>
            <h2>${{ usuario?.cuenta.balance }}</h2>
          </ion-label>
        </ion-list-header>
      </ion-list>
      <ion-list class="tarjeta">
        <ion-list-header class="titulo">
          <ion-label><h1>Historial de Transacciones</h1></ion-label>
        </ion-list-header>
        <ion-item lines="none" v-for="transaccion in transacciones" :key="transaccion.id">
          <ion-icon :icon="listCircle" size="large"/>
          <ion-label @click="seleccionarTransaccion(transaccion)">
            <h3>{{ transaccion.tipo }}</h3>
            <p>{{ transaccion.titulo }}</p>
          </ion-label>
        </ion-item>
        <ion-item v-if="transacciones.length == 0" lines="none">
          <h2>No hay transacciones.</h2>
        </ion-item>
      </ion-list>

      <ion-modal ref="modal" :initial-breakpoint="0.70" :breakpoints="[0, 0.70]">
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item lines="none">
              <ion-label><h3>Detalles de la transacción</h3></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Tipo: {{ selectedTransac?.tipo }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Detalle: {{ selectedTransac?.detalle }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Monto: ${{ selectedTransac?.monto }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Método de Pago: {{ selectedTransac?.metodo_pago }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Emisor de transacción: {{ selectedTransac?.emisor }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Receptor de fondos: {{ selectedTransac?.receptor }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Saldo Anterior: ${{ selectedTransac?.saldo_anterior }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Nuevo Saldo: ${{ selectedTransac?.nuevo_saldo }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Fecha y hora: {{ new Date(selectedTransac?.fecha!).toLocaleString() }}</p></ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label><p>Estado: {{ selectedTransac?.estado }}</p></ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonLabel, IonList, IonListHeader, IonIcon,onIonViewWillEnter, IonModal } from '@ionic/vue';
import { listCircle } from 'ionicons/icons';
import { ref } from 'vue';
import UserService from '@/api/UserService';
import User from '@/interface/User';
import NotificationBell from '@/components/NotificationBell.vue';
import Transaction from '@/interface/Transaction';
import TransactionService from '@/api/TransactionService';

const usuario = ref<User>();
const transacciones = ref<Transaction[]>([]);
const selectedTransac = ref<Transaction | null>(null);
const modal = ref();

const seleccionarTransaccion = (transaccion: Transaction) => {
  selectedTransac.value = transaccion;
  modal.value.$el.present();
}

onIonViewWillEnter(async () => {
  const user = await UserService.loggedUser();
  if (user) {
    usuario.value = user;
    transacciones.value = await TransactionService.obtenerTransac(user.id);
  }  
})
</script>

<style scoped>
.tarjeta {
  padding: 25px 15px;
  margin: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

h1 {
  font-size: 18px;
  margin-bottom: 15px;
}

h2 {
  font-size: 15px;
  color: #555;
}

h3 {
  font-size: 15px;
}

p {
  color: #555;
}

ion-icon {
  color: #1f95ad;
  padding-right: 15px;
}

ion-item {
  border-top: 1px solid #ddd;
}
</style>