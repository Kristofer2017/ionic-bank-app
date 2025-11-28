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
            <h1>Bienvenido/a, {{ usuario?.nombre }}</h1>
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
          <ion-label>
            <h3>{{ transaccion.tipo }}</h3>
            <p>{{ transaccion.detalle }}</p>
          </ion-label>
        </ion-item>
        <ion-item v-if="transacciones.length == 0" lines="none">
          <h2>No hay transacciones.</h2>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonLabel, IonList, IonListHeader, IonIcon, onIonViewWillEnter } from '@ionic/vue';
import { listCircle } from 'ionicons/icons';
import { ref } from 'vue';
import UserService from '@/api/UserService';
import UserLogged from '@/interface/UserLogged';
import NotificationBell from '@/components/NotificationBell.vue';
import Transaction from '@/interface/Transaction';
import TransactionService from '@/api/TransactionService';

const usuario = ref<UserLogged>();
const transacciones = ref<Transaction[]>([]);

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