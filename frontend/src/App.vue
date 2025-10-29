<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <SidebarMenu />
      <ion-router-outlet id="main-content" />
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import { IonSplitPane, IonRouterOutlet } from '@ionic/vue';
import SidebarMenu from './components/SidebarComponent.vue';
</script>

<style scoped>
ion-content, ion-toolbar, ion-item {
  --background: #FAF9F6;
}
</style>