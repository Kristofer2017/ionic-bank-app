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
      <ion-list class="tarjeta">
        <ion-list-header class="titulo">
          <ion-label>Envía dinero a familiares o deposita dinero en tu cuenta mediante una tarjeta de crédito o débito.</ion-label>
        </ion-list-header>

        <ion-item lines="full" @click="open(SendPage)">
          <ion-icon :icon="repeatOutline" slot="start"></ion-icon>
          <ion-label>Transferir o enviar</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>

        <ion-item lines="none" @click="open(TopupPage)">
          <ion-icon :icon="bagAddOutline" slot="start"></ion-icon>
          <ion-label>Recargar cuenta</ion-label>
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
import { repeatOutline, bagAddOutline, chevronForward } from 'ionicons/icons';
import { useModal } from '@/composable/useModal';
import TopupPage from './TopupPage.vue';
import SendPage from './SendPage.vue';

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