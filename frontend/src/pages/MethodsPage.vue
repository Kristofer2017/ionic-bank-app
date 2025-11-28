<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack" /></ion-button>
        </ion-buttons>
        <ion-title>Métodos de pago</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="payment-wrapper">
      <div class="button-row">
        <ion-button fill="solid" size="small" @click="addPaymentMethod">
          <ion-icon :icon="addOutline" slot="start" />Agregar método de pago
        </ion-button>
      </div>
      <ion-card class="card" v-for="metodo in metodos" :key="metodo.id"
        :style="{ backgroundColor: palette[(metodo.id-1) % (palette.length)] }">
        <ion-card-header>
          <ion-card-title class="titulo-carta">{{ metodo.marca }} ***{{ metodo.ultimos4 }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Expira {{ metodo.expiracion }}</p>
          <p>{{ metodo.titular }}</p>
          <div class="card-actions">
            <ion-icon :icon="createOutline" @click="editCard(metodo)" />
            <ion-icon :icon="trashOutline" @click="confirmDelete(metodo.id)" />
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-alert :is-open="mostrarAlert" :buttons="alertButtons" message="¿Estás seguro de eliminar esta tarjeta?" header="Confirmación" />
    <ion-toast :is-open="mostrarToast" message="Tarjeta eliminada." :duration="3000"  @didDismiss="mostrarToast = false" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAlert, IonToast } from '@ionic/vue';
import { arrowBack, addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { onMounted, ref, watch } from 'vue';
import { useMetodoStore } from '@/stores/metodoStore';
import ModalProps from '@/interface/ModalProps';
import MethodsAddPage from './MethodsAddPage.vue';
import MetodoService from '@/api/MetodoService';
import UserService from '@/api/UserService';
import MetodoPago from '@/interface/MetodoPago';

const metodoStore = useMetodoStore();
const props = defineProps<ModalProps>();
const metodos = ref<MetodoPago[]>([]);
const palette = ['#005F73', '#5d0793', '#977901', '#035699'];
const idEliminar = ref();
const mostrarAlert = ref(false);
const mostrarToast = ref(false);

const addPaymentMethod = () => {
  metodoStore.setMetodoEditar(null);
  props.nextPage(MethodsAddPage);
}

const editCard = (tarjeta: MetodoPago) => {
  metodoStore.setMetodoEditar(tarjeta);
  props.nextPage(MethodsAddPage);
}

const confirmDelete = (id: number) => {
  idEliminar.value = id;
  mostrarAlert.value = true;
}

const deleteConfirmed = async () => {
  const eliminado = await MetodoService.elminarMetodo(idEliminar.value);
  if (eliminado) {
    mostrarToast.value = true;
    metodoStore.refrescarDatos = true;
  }
  mostrarAlert.value = false;
}

const alertButtons = [
  { text: 'Cancelar', role: 'cancel', handler: () => { mostrarAlert.value = false }},
  { text: 'Eliminar', role: 'confirm', handler: async () => { await deleteConfirmed() }}
];

const cargarDatos = async () => {
  const user = await UserService.loggedUser();
  if (user) {
    metodos.value = await MetodoService.obtenerMetodos(user.id);
  }
}

watch(() => metodoStore.refrescarDatos, async (v) => { 
  if (v) {
    await cargarDatos();
    metodoStore.refrescarDatos = false;
  }
});

onMounted(async() => { await cargarDatos() });
</script>

<style scoped>
.payment-wrapper {
  --padding-top: 1.5rem;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
}

.button-row ion-button {
  --color: #fff;
  --background: #3A3A3A;
  font-size: 0.85rem;
}

.card {
  background-color: #977901;
  color: #FAF9F6;
  border-radius: 12px;
  box-shadow: 0 2
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
}

.card-actions ion-icon {
  font-size: 1.4rem;
  cursor: pointer;
  color: #dae4e2;
}

.titulo-carta {
  font-size: 1.4rem;
  font-weight: 600;
  color: #FAF9F6;
}
</style>