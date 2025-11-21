<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inicio</ion-title>
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
        <ion-item lines="none">
          <ion-icon :icon="listCircle" slot="start" size="large"></ion-icon>
          <ion-label>
            <h2>Transferencia</h2>
            <p>Se enviaron $3 a Kevin Gutierrez</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonLabel, IonList, IonListHeader, IonIcon } from '@ionic/vue';
import { listCircle } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from '@/stores/usuarioStore';
import UserService from '@/api/UserService';
import UserLogged from '@/interface/UserLogged';

const usuarioStore = useUsuarioStore();
const usuario = ref<UserLogged | null>(null);

onMounted(async() => {
  if (usuarioStore.usuarioAutenticado){
    usuario.value = usuarioStore.usuarioAutenticado;
    return;
  }
  const loggedUser = await UserService.loggedUser();
  if (loggedUser) {
    usuarioStore.usuarioAutenticado = loggedUser;
    usuario.value = loggedUser;
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

p {
  color: #555;
}

ion-icon {
  color: #1f95ad;
}

ion-item {
  border-top: 1px solid #ddd;
}
</style>