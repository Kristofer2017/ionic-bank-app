<template>
  <ion-menu content-id="main-content">
    <ion-content>
      <ion-list class="lista-links">
        <ion-item lines="full" class="img-container">
          <img src="@/assets/banco-logo-alt.png" alt="logo banca">
        </ion-item>
        <ion-menu-toggle :auto-hide="true">
          <ion-item @click="router.push('/home')" lines="full">
            <ion-icon slot="start" :md="homeOutline"></ion-icon>
            <ion-label>Inicio</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="true">
          <ion-item @click="router.push('/transfer')" lines="full">
            <ion-icon slot="start" :md="swapHorizontalOutline"></ion-icon>
            <ion-label>Transferencias</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="true">
          <ion-item @click="router.push('/services')" lines="full">
            <ion-icon slot="start" :md="gridOutline"></ion-icon>
            <ion-label>Servicios</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="true">
          <ion-item class="logout-btn" lines="none">
            <ion-button shape="round" @click="logout">
              <ion-icon slot="end" :icon="exitOutline"></ion-icon>
              <ion-label>Cerrar Sesión</ion-label>
            </ion-button>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import { IonMenu, IonMenuToggle, IonContent, IonList, IonItem, IonButton, IonIcon, IonLabel } from '@ionic/vue';
import { homeOutline, swapHorizontalOutline, gridOutline, exitOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import UserService from '@/api/UserService';

const router = useRouter();

const logout = async () => {
  await UserService.logout();
  router.push('/login');
}
</script>

<style scoped>
.img-container > * {
  padding: 30px 10px;
}

.lista-links {
  padding: 20px 0;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.lista-links ion-item {
  --background: #fff;
}

.logout-btn {
  padding: 27px 0 17px;
}

.logout-btn > * {
  font-size: 13px;
  width: 100%;
  --padding-top: 17px;
  --padding-bottom: 17px;
  --background: #0b7d94;
}
</style>