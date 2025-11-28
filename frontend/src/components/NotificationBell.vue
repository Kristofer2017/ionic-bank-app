<template>
  <ion-button id="notif-btn" fill="clear" slot="end" @click="openPopover">
    <ion-icon :icon="notificationsOutline"></ion-icon>
  </ion-button>

  <ion-popover ref="popover" @willPresent="onOpen" @didDismiss="onClose" side="bottom" alignment="end">
    <ion-content v-if="notificaciones.length == 0" class="ion-padding">
        <ion-label>No hay notificaciones.</ion-label>
    </ion-content>
    <ion-content v-else>
      <ion-button fill="clear" @click="markAllAsRead">Marcar todo como visto</ion-button>
      <ion-list>        
        <ion-item v-for="n in notificaciones" :key="n.id" :button="true" @click="toggleRead(n.id!)" lines="full">
          <div class="unread-indicator-wrapper" slot="start">
            <div class="unread-indicator" :class="{ read: n.visto }"></div>
          </div>
          <ion-label>
            <span :class="n.visto ? 'titulo-read' : 'titulo-unread'">{{ n.titulo }}</span><br>
            <ion-note color="medium" class="ion-text-wrap">{{ n.descripcion }}</ion-note>
          </ion-label>
          <div class="metadata-end-wrapper" slot="end">
            <ion-note color="medium">Hoy</ion-note>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel, IonNote, IonContent } from '@ionic/vue'
import { notificationsOutline } from 'ionicons/icons';
import { ref } from 'vue';
import Notification from "@/interface/Notification";
import NotificationService from '@/api/NotificationService';
import UserService from '@/api/UserService';

const notificaciones = ref<Notification[]>([]);
const popover = ref<InstanceType<typeof IonPopover>>();

const openPopover = (e: Event) => {
  popover.value?.$el.present(e);
}

const markAllAsRead = () => {
  notificaciones.value = notificaciones.value.map(n => ({ ...n, visto: true }))
}

const toggleRead = (id: number) => {
  const n = notificaciones.value.find(n => n.id === id)
  if (n) n.visto = !n.visto
}

const onOpen = async () => { 
  const user = await UserService.loggedUser();
  if (user){
    notificaciones.value = await NotificationService.obtenerNotificaciones(user.id);
  }
};

const onClose = () => {
  notificaciones.value = [];
}
</script>

<style scoped>
.unread-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ion-color-primary);
}

.unread-indicator.read {
  opacity: 0.2;
}

.titulo-unread {
  font-weight: 700;
}

.titulo-read {
  font-weight: 400;
}

ion-popover {
  --width: 350px;
}
</style>