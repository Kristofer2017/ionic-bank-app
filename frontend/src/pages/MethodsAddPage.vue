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
    <IonContent :fullscreen="true" class="form-wrapper">
      <div class="form-container">
        <h2 class="form-title">Agregar o editar método</h2>

        <div class="form-row">
          <IonLabel class="label">Nombre del holder</IonLabel>
          <IonInput class="input" placeholder="Ej. Juan Pérez" />
        </div>

        <div class="form-row">
          <IonLabel class="label">Número de tarjeta</IonLabel>
          <IonInput class="input" type="number" placeholder="•••• •••• •••• ••••" />
        </div>

        <div class="form-row">
          <IonLabel class="label">Fecha de expiración</IonLabel>
          <div class="input-with-icon">
            <IonInput class="input" type="date" placeholder="dd/mm/aaaa" />
          </div>
        </div>

        <div class="form-row">
          <IonLabel class="label">CVV</IonLabel>
          <IonInput class="input" type="number" placeholder="•••" />
        </div>

        <div class="form-row">
          <IonLabel class="label">Tipo de tarjeta</IonLabel>
          <IonRadioGroup class="radio-group" value="credito">
            <IonItem lines="none">
              <IonRadio value="credito" />
              <IonLabel>Crédito</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonRadio value="debito" />
              <IonLabel>Débito</IonLabel>
            </IonItem>
          </IonRadioGroup>
        </div>

        <div class="boton-row">
          <IonButton fill="outline" color="medium">Cancelar</IonButton>
          <IonButton color="primary">Confirmar</IonButton>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonLabel, IonInput, IonRadio, IonRadioGroup, IonItem } from '@ionic/vue'
import { arrowBack } from 'ionicons/icons';
import ModalProps from '@/interface/ModalProps';
const props = defineProps<ModalProps>();
</script>

<style scoped>
.form-wrapper {
  display: flex;
  align-items: center;
  padding: 2rem;
  height: 100%;
  box-sizing: border-box;
}

.form-container {
    justify-self: center;  

  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
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
