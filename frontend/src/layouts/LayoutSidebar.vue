<template>
  <ion-page>
    <ion-split-pane>
      <!-- Sidebar -->
      <ion-menu content-id="main-content">
        <ion-content class="contenido-lateral">
          <ion-list class="lista-links">
            <ion-item lines="full" class="img-container">
              <img src="../assets/banco-logo-alt.png" alt="logo banca">
            </ion-item>
            <ion-item router-link="/home" lines="full">
              <ion-icon slot="start" :md="homeOutline"></ion-icon>
              <ion-label>Inicio</ion-label>
            </ion-item>
            <ion-item router-link="/transfer" lines="full">
              <ion-icon slot="start" :md="swapHorizontalOutline"></ion-icon>
              <ion-label>Transferencias</ion-label>
            </ion-item>
            <ion-item router-link="/services" lines="full">
              <ion-icon slot="start" :md="gridOutline"></ion-icon>
              <ion-label>Servicios</ion-label>
            </ion-item>
            <ion-item class="logout-btn" lines="none">
              <ion-button shape="round">
                <ion-icon slot="end" :icon="exitOutline"></ion-icon>
                <ion-label>Cerrar Sesión</ion-label>
              </ion-button>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <!-- Contenido principal -->
      <ion-page id="main-content">
        <ion-router-outlet></ion-router-outlet>
      </ion-page>
    </ion-split-pane>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonSplitPane, IonMenu, IonContent, IonList, IonItem, IonRouterOutlet, IonButton, IonIcon, IonLabel } from '@ionic/vue';
import { homeOutline, swapHorizontalOutline, gridOutline, exitOutline } from 'ionicons/icons';
</script>

<style scoped>
ion-content, ion-toolbar, ion-item {
  --background: #FAF9F6;
}

.img-container > * {
  padding: 30px 10px;
}

.lista-links {
  padding: 20px 0;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.lista-links > * {
  --background: #fff;
}

.logout-btn {
  padding: 27px 0 17px;
}

.logout-btn > * {
  font-size: 13px;
  width: 100%;
  --padding-top: 17px;
  --padding-bottom: 17px;
  --background: #0b7d94;
}
</style>