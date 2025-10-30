<template>
  <ion-page>
    <ion-split-pane content-id="main-content">
      <SidebarComponent />
      <ion-page id="main-content">
        <ion-router-outlet :key="$route.fullPath" />
      </ion-page>
    </ion-split-pane>
  </ion-page>
</template>

<script setup>
import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
</script>