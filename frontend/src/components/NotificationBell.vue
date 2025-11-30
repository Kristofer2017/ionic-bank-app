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
        <ion-item v-for="notificacion in notificaciones" :key="notificacion.id" :button="true" @click="toggleRead(notificacion.id!)" lines="full">
          <div class="unread-indicator-wrapper" slot="start">
            <div class="unread-indicator" :class="{ read: notificacion.visto }"></div>
          </div>
          <ion-label>
            <span :class="notificacion.visto ? 'titulo-read' : 'titulo-unread'">{{ notificacion.titulo }}</span><br>
            <ion-note color="medium" class="ion-text-wrap">{{ notificacion.descripcion }}</ion-note>
          </ion-label>
          <div class="metadata-end-wrapper" slot="end">
            <ion-note color="medium">{{ formatearDia(notificacion.fecha!) }}</ion-note>
            <ion-note color="medium">{{ formatearHora(notificacion.fecha!) }}</ion-note>
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

// Marca una notificación como visto/no visto
const toggleRead = async (id_notificacion: number) => {
  const notificacion = notificaciones.value.find(n => n.id === id_notificacion);
  if (notificacion) {
    const success = await NotificationService.marcarUnaVisto(id_notificacion, !notificacion.visto);
    if (success) notificacion.visto = !notificacion.visto;
  }
}

// Marca todas las notificaciones como visto
const markAllAsRead = async () => {
  const user = await UserService.loggedUser();
  if (user) {
    const success = await NotificationService.marcarTodasVisto(user.id);
    if (success) notificaciones.value.forEach(n => n.visto = true);
  }
}

// Carga las notificaciones del usuario al abrir el popover
const onOpen = async () => { 
  const user = await UserService.loggedUser();
  if (user){
    notificaciones.value = await NotificationService.obtenerNotificaciones(user.id);
  }
};

// Limpia las notifiaciones al cerrar
const onClose = () => {
  notificaciones.value = [];
  popover.value?.$el.dismiss();
}

// Funciones auxiliares para formatear fecha y hora
function formatearDia(fechaStr: string): string {
  const fecha = new Date(fechaStr);
  const hoy = new Date();

  const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const inicioFecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

  const diffMs = inicioHoy.getTime() - inicioFecha.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (diffDias === 0) return 'Hoy';
  if (diffDias === 1) return 'Ayer';

  // Día de la semana
  const dias = ['Dom','Lun','Mar','Mie','Jue','Vier','Sab'];
  if (diffDias < 7) return dias[fecha.getDay()];

  // Fecha vieja → dd/mm/aaaa
  const d = fecha.getDate().toString().padStart(2, '0');
  const m = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const a = fecha.getFullYear();
  return `${d}/${m}/${a}`;
}

function formatearHora(fechaStr: string): string {
  const fecha = new Date(fechaStr);

  let horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, '0');

  const ampm = horas >= 12 ? 'PM' : 'AM';
  horas = horas % 12;
  if (horas === 0) horas = 12;

  return `${horas}:${minutos} ${ampm}`;
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
.metadata-end-wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
}
</style>