<template>
  <ion-button id="notif-btn" fill="clear" slot="end">
    <ion-icon :icon="notificationsOutline"></ion-icon>
  </ion-button>

  <ion-popover trigger="notif-btn" trigger-action="click">
    <ion-content>
      <ion-button fill="clear" @click="markAllAsRead">
        Marcar todo como visto
      </ion-button>

      <ion-list>
        <ion-item v-for="n in notifs" :key="n.id" :button="true" detail="false" @click.stop="toggleRead(n.id)">
          <div class="unread-indicator-wrapper" slot="start">
            <div class="unread-indicator" :class="{ read: n.visto }"></div>
          </div>

          <ion-label>
            <span :class="{ 'titulo-unread': !n.visto, 'titulo-read': n.visto }">
              {{ n.titulo }}
            </span><br>
            <ion-note color="medium" class="ion-text-wrap">
              {{ n.descripcion }}
            </ion-note>
          </ion-label>

          <div class="metadata-end-wrapper" slot="end">
            <ion-note color="medium">{{ n.fecha }}</ion-note>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup>
import {
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonContent
} from '@ionic/vue'

import {
  notificationsOutline,
} from 'ionicons/icons'

import { ref } from 'vue'

const notifs = ref([
  {
    id: 1,
    titulo: "Steam",
    subtitulo: "Game Store Sale",
    descripcion: "Ese juego que dejaste en tu lista está con descuento.",
    fecha: "Ayer",
    visto: false
  },
  {
    id: 2,
    titulo: "Facebook",
    subtitulo: "Nuevo comentario",
    descripcion: "Alguien comentó tu publicación.",
    fecha: "Hoy",
    visto: true
  }
])

const markAllAsRead = () => {
  notifs.value = notifs.value.map(n => ({ ...n, visto: true }))
}

const toggleRead = (id) => {
  const n = notifs.value.find(n => n.id === id)
  if (n) n.visto = !n.visto
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
</style>
