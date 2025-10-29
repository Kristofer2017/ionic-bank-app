<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Servicios</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
        <ion-list class="lista-opciones">
          <ion-list-header class="titulo">
            <ion-label>Paga servicios en negocios disponibles o administra tus métodos de pago.</ion-label>
          </ion-list-header>
          <ion-item lines="full" :button="true">
            <ion-icon :icon="receiptOutline" slot="start"></ion-icon>
            <ion-label>Pagar Servicios</ion-label>
            <ion-icon :icon="chevronForward" slot="end"></ion-icon>
          </ion-item>
          <ion-item lines="none" :button="true">
            <ion-icon :icon="cardOutline" slot="start"></ion-icon>
            <ion-label>Métodos de pago</ion-label>
            <ion-icon :icon="chevronForward" slot="end"></ion-icon>
          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonIcon, IonLabel, IonList, IonListHeader } from '@ionic/vue';
import { receiptOutline, cardOutline, chevronForward } from 'ionicons/icons';
</script>

<style scoped>
.lista-opciones {
  padding: 25px 15px;
  margin: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.titulo {
  margin-bottom: 10px;
  color: #777;
}
</style>