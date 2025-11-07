<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back()"><ion-icon slot="icon-only" :icon="arrowBack" /></ion-button>
        </ion-buttons>
        <ion-title>Métodos de pago</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="payment-wrapper">
      <section class="header">
        <h2>Métodos de pago</h2>
      </section>
      <div class="button-row">
        <ion-button fill="solid" size="small" @click="addPaymentMethod">
          <IonIcon :icon="addOutline" slot="start" />
          Agregar método de pago
        </ion-button>
      </div>

      <ion-card class="card">
        <ion-card-header>
          <ion-card-title class="titulo-carta">Visa ***4645</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Expira 11/27</p>
          <div class="card-actions">
            <ion-icon :icon="createOutline" @click="editCard" />
            <ion-icon :icon="trashOutline" @click="deleteCard" />
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { arrowBack, addOutline, createOutline, trashOutline } from 'ionicons/icons';
import ModalProps from '@/interface/ModalProps';
import MethodsAddPage from './MethodsAddPage.vue';

const props = defineProps<ModalProps>();

const addPaymentMethod = () => {
  props.nextPage(MethodsAddPage);
}

const editCard = () => {
  // lógica para editar
}

const deleteCard = () => {
  // lógica para eliminar
}
</script>

<style scoped>
.payment-wrapper {
  padding: 1.5rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.75rem;
}

.header h2 {
  font-size: 1.8rem;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 600;
  color: #005F73;
  margin: 0;
  text-align: center;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
}

.button-row ion-button {
  --color: #ffffff;
  --border-color: #00abcd;
  --background: #3A3A3A;
  font-size: 0.85rem;
}

.card {
  background-color: #005F73;
  color: #FAF9F6;
  border-radius: 12px;
  box-shadow: 0 2
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
}

.card-actions ion-icon {
  font-size: 1.4rem;
  cursor: pointer;
  color: #94D2BD;
}

.titulo-carta {
  font-size: 1.4rem;
  font-weight: 600;
  color: #FAF9F6;
}
</style>