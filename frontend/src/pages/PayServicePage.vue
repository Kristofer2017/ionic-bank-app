<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back()"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Detalle del pago</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
        <ion-list class="tarjeta">
          <ion-list-header>
            <ion-label class="titulo">Servicios disponibles para el negocio seleccionado</ion-label>
          </ion-list-header>
          <div class="contenedor-servicios">
          <ion-item lines="none" class="item">
            <ion-icon slot="start" size="large" :icon="listCircle" class="icono" />
            <ion-label>Recarga Movil $5</ion-label>
          </ion-item>
          <ion-item lines="none" class="item">
            <ion-icon slot="start" size="large" :icon="listCircle" class="icono" />
            <ion-label>Recarga Movil $5</ion-label>
          </ion-item>
          </div>
        </ion-list>

        <ion-list class="tarjeta">
          <ion-list-header>
            <ion-label class="titulo">No hay servicios disponibles para la empresa seleccionada.</ion-label>
          </ion-list-header>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/vue';
import { arrowBack, listCircle } from 'ionicons/icons';
import ModalProps from '@/interface/ModalProps';
const props = defineProps<ModalProps>();
</script>

<style scoped>
.tarjeta {
  padding: 25px 17px;
  margin: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.titulo {
  color: #777;
  font-size: 15px;
}

.contenedor-servicios {
  margin-top: 13px;
}

.item {
  --background: #d3d3d32f;
  border-radius: 12px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.icono {
  color: #1f95ad;
  --margin-right: 0;
}


</style>