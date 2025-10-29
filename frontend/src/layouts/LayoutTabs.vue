<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <TabsComponent />
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue';
import TabsComponent from '@/components/TabsComponent.vue';
</script>