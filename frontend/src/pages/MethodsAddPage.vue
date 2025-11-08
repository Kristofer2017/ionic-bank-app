<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back()"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Detalle del pago</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="form-container">
        <h2 class="form-title">Agregar o editar método</h2>

        <div class="form-row">
          <ion-label class="label">Nombre del titular</ion-label>
          <ion-input class="input" placeholder="Ej. Juan Pérez" />
        </div>

        <div class="form-row">
          <ion-label class="label">Número de tarjeta</ion-label>
          <ion-input class="input" type="password" placeholder="xxxx-xxxx-xxxx-xxxx" />
        </div>

        <div class="form-row">
          <ion-label class="label">Fecha de expiración</ion-label>
          <div class="input-with-icon">
            <ion-input class="input" type="text" placeholder="mm/aa" />
          </div>
        </div>

        <div class="form-row">
          <ion-label class="label">CVV</ion-label>
          <ion-input class="input" type="number" placeholder="xxx" />
        </div>

        <div class="boton-row">
          <ion-button fill="outline" color="medium">Cancelar</ion-button>
          <ion-button color="primary">Confirmar</ion-button>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonLabel, IonInput } from '@ionic/vue'
import { arrowBack } from 'ionicons/icons';
import ModalProps from '@/interface/ModalProps';
const props = defineProps<ModalProps>();
</script>

<style scoped>


.form-container {
  margin: 1em;
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  
  font-size: 1.6rem;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 600;
  color: #005F73;
  margin-bottom: 2rem;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

.label {
  width: 45%;
  font-weight: 500;
  color: #3A3A3A;
}

.input {
  width: 50%;
}

.input-with-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 50%;
}

.radio-group {
  display: flex;
  gap: 2rem;
  width: 50%;
}
.radio-group ion-label {
  margin-left: 10px;
}

.boton-row {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>
