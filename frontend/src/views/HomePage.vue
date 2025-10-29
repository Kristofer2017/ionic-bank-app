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

    <ion-content>
      <div class="contenedor">
        <ion-item>
          <h1>Saldo disponible</h1>
        </ion-item>
        <ion-item>
          <h3>0.00</h3>
        </ion-item>
        <ion-item class="todos-los-negocios" lines="none">
          <div>
          <h4>Transacciones en la cuenta</h4>
          <ion-list class="lista-empresas">
            <ion-item>
              <ion-label>
                <h2>Transaccion Titulo</h2>
                <p>Detalle transaccion</p>
              </ion-label>
            </ion-item>
          </ion-list>
          </div>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonItem, IonLabel, IonList } from '@ionic/vue';

</script>

<style scoped>

</style>