<template>
  <ion-tab-bar slot="bottom" class="tabs-menu">
    <ion-tab-button tab="home" href="/home">
      <ion-icon aria-hidden="true" :icon="homeOutline" />
      <ion-label>Inicio</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="transfer" href="/transfer">
      <ion-icon aria-hidden="true" :icon="swapHorizontalOutline" />
      <ion-label>Transferir</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="services" href="/services">
      <ion-icon aria-hidden="true" :icon="gridOutline" />
      <ion-label>Servicios</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { homeOutline, swapHorizontalOutline, gridOutline } from 'ionicons/icons';

</script>

<style scoped>
.tabs-menu {
  --background: #0a6f83;
  --color: #bbb;
  --color-selected: #fff;
  height: 70px;
  width: 100%;
  padding: 0;
}

.tabs-menu ion-icon {
  font-size: 24px;
}

.tabs-menu ion-label {
  font-size: 14px;
}
</style>