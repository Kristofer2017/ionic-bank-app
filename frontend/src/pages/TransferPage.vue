<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Transferir</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <ion-list class="lista-opciones">
        <ion-list-header class="titulo">
          <ion-label>Envía dinero a familiares o deposita dinero en tu cuenta mediante una tarjeta de crédito o débito.</ion-label>
        </ion-list-header>
        <ion-item lines="full" href="/transfer/send">
          <ion-icon :icon="peopleOutline" slot="start"></ion-icon>
          <ion-label>Transferir</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
        <ion-item lines="none" href="/transfer/topup">
          <ion-icon :icon="bagAddOutline" slot="start"></ion-icon>
          <ion-label>Recargar</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonIcon, IonLabel, IonList, IonListHeader } from '@ionic/vue';
import { peopleOutline, bagAddOutline, chevronForward } from 'ionicons/icons';
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