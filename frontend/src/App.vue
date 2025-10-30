<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
ion-content, ion-toolbar, ion-item {
  --background: #FAF9F6;
}
</style>