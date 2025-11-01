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
      <ion-list class="tarjeta">
        <ion-list-header class="titulo">
          <ion-label>Paga servicios en negocios disponibles o administra tus métodos de pago.</ion-label>
        </ion-list-header>

        <ion-item lines="full" @click="open(PayPage)">
          <ion-icon :icon="receiptOutline" slot="start"></ion-icon>
          <ion-label>Pagar servicios</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>

        <ion-item lines="none" @click="open(MethodsPage)">
          <ion-icon :icon="cardOutline" slot="start"></ion-icon>
          <ion-label>Métodos de pago</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>
      
      <ion-modal ref="modal" @will-present="onWillPresent">
          <ion-nav ref="nav"></ion-nav>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonIcon, IonLabel, IonList, IonListHeader, IonModal, IonNav } from '@ionic/vue';
import { receiptOutline, cardOutline, chevronForward } from 'ionicons/icons';
import { useModal } from '@/composable/useModal';
import MethodsPage from './MethodsPage.vue';
import PayPage from './PayPage.vue';

const { modal, nav, onWillPresent, open } = useModal();
</script>

<style scoped>
.tarjeta {
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