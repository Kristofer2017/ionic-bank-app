<template>
  <ion-page>
    <ion-split-pane content-id="main-content">
      <SidebarComponent />
      <ion-page id="main-content">
        <ion-tabs>
          <ion-router-outlet />
          <TabsComponent />
        </ion-tabs>
      </ion-page>
    </ion-split-pane>
  </ion-page>
</template>

<script setup>
import { IonPage, IonRouterOutlet, IonSplitPane, IonTabs } from '@ionic/vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import TabsComponent from '@/components/TabsComponent.vue';
</script>

<style>
/*ion-toolbar {
  --background: #097e96;
  --color: #eee;
  --padding-top: 9px;
} */
</style>