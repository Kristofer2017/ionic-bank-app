<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Detalle del pago</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
        <ion-list class="tarjeta">
          <ion-list-header>
            <ion-label>{{ titulo1 }}</ion-label>
          </ion-list-header>
          <div v-if="servicios.length == 0 || pagoManual" class="contenedor">
            <ion-item lines="none">
              <ion-input type="number" placeholder="Monto a pagar"></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-input type="text" placeholder="Concepto"></ion-input>
            </ion-item>
          </div>
          <div v-else class="contenedor">
            <ion-item v-for="servicio in servicios" :key="servicio.id" lines="none">
              <ion-icon :icon="listCircle" />
              <ion-label>
                <h2>{{ servicio.nombre }}</h2>
                <p>Precio: ${{ servicio.precio }}</p>
              </ion-label>
              <ion-icon :icon="checkmarkCircle" slot="end" color="success"></ion-icon>
            </ion-item>
          </div>
          <ion-toggle v-if="servicios.length > 0" v-model="pagoManual">Ingresar el monto manualmente</ion-toggle>
        </ion-list>
        <ion-list class="tarjeta">
          <ion-list-header>
            <ion-label>Selecciona el método a utilizar para realizar el pago solicitado.</ion-label>
          </ion-list-header>
          <div class="contenedor" v-if="pagoSaldo">
            <ion-item lines="none">
              <ion-icon :icon="checkmarkCircle"></ion-icon>
              <ion-label>
                <h2>Saldo: $100.25</h2>
                <p>Disponible</p>
              </ion-label>
            </ion-item>
          </div>
          <div class="contenedor" v-else>
            <ion-item lines="none">
              <ion-icon :icon="cardOutline" />
              <ion-label>
                <h2>Tarjeta ***4521</h2>
                <p>Expira 11/10</p>
              </ion-label>
              <ion-icon :icon="checkmarkCircle" slot="end" color="success"></ion-icon>
            </ion-item>
          </div>
          <ion-toggle v-model="pagoSaldo">Usar saldo en la cuenta</ion-toggle>
        </ion-list>
        <ion-list class="tarjeta">
          <ion-list-header>
            <ion-label>
              <h2>Detalles del pago</h2><br>
              <p>Nombre del negocio: </p>
              <p>Servicio: </p>
              <p>Precio: </p>
              <p>Método de pago: </p>
            </ion-label>
          </ion-list-header>
          <ion-grid>
            <ion-row>
              <ion-col><ion-button expand="full" class="btn-cancelar">Cancelar</ion-button></ion-col>
              <ion-col><ion-button expand="full" class="btn-continuar">Confirmar</ion-button></ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonListHeader, IonLabel, IonItem, IonToggle, IonInput } from '@ionic/vue';
import { arrowBack, listCircle, checkmarkCircle, cardOutline } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import { useEmpresaStore } from '@/stores/empresaStore';
import ModalProps from '@/interface/ModalProps';
import EmpresaService from '@/api/EmpresaService';
import Servicio from '@/interface/Servicio';
import Empresa from '@/interface/Empresa';

const props = defineProps<ModalProps>();
const empresaStore = useEmpresaStore();
const servicios = ref<Servicio[]>([]);
const empresa = ref<Empresa | null>(null);
//const servicioSeleccionado = ref<Servicio | null>(null);
const pagoManual = ref(false);
const pagoSaldo = ref(false);
const titulo1 = ref('');

onMounted(async () => {
  empresa.value = empresaStore.empresaSeleccionada;
  const idEmpresa = empresa.value?.id;
  const dataServicios = await EmpresaService.obtenerServicios(idEmpresa!);

  if (dataServicios) servicios.value = dataServicios;
  definirTitulo1();
})

function definirTitulo1() {
  if(servicios.value.length === 0){
    titulo1.value = 'No hay servicios disponibles para la empresa seleccionada. Por favor ingresa el monto manualmente.';
  } else if (pagoManual.value) {
    titulo1.value = 'Ingresa el monto a pagar al negocio seleccionado y el concepto del pago a realizar.';
  } else {
    titulo1.value = 'Servicios disponibles para el negocio seleccionado.';
  }
}
</script>

<style scoped>
.tarjeta ion-list-header {
  padding: 0;
}

.tarjeta ion-list-header ion-label {
  color: #777;
  font-size: 16px;
}

ion-toggle {
  color: #777;
}

.tarjeta {
  padding: 25px;
  margin: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.contenedor {
  margin: 15px 0 20px;
}

.contenedor ion-item {
  background: #d3d3d32f;
  border: 1px solid #ddd;
  margin: 10px 0;
}

.contenedor ion-icon:first-child {
  color: #1f95ad;
  font-size: 28px;
  margin-right: 13px;
}
</style>