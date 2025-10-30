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
            <h1>Saldo Disponible</h1>
            <h2>0.00</h2>
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
</script>

<style scoped>
.tarjeta {
  padding: 25px 15px;
  margin: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

h1 {
  font-size: 20px;
  margin-bottom: 15px;
}

ion-icon {
  color: #1f95ad;
}

ion-item {
  border-top: 1px solid #ddd;
}
</style>