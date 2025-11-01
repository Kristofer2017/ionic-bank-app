<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back()"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Transferir</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import ModalProps from '@/interface/ModalProps';

const props = defineProps<ModalProps>();
</script>

<style scoped>

</style>