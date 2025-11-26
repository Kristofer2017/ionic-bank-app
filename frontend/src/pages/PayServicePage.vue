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
            <ion-label>{{ definirTitulo1() }}</ion-label>
          </ion-list-header>
          <div v-if="servicios.length == 0 || pagoManual" class="contenedor">
            <ion-item lines="none">
              <ion-input type="number" placeholder="Monto a pagar" v-model.number="manualAmount"></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-input type="text" placeholder="Concepto" v-model="manualConcept"></ion-input>
            </ion-item>
          </div>
          <div v-else class="contenedor">
            <ion-item v-for="servicio in servicios" :key="servicio.id" lines="none">
              <ion-icon :icon="listCircle" />
              <ion-label @click="seleccionarServicio(servicio)">
                <h2>{{ servicio.nombre }}</h2>
                <p>Precio: ${{ servicio.precio }}</p>
              </ion-label>
              <ion-icon v-if="servicioSelec && servicioSelec.id == servicio.id" :icon="checkmarkCircle" slot="end" color="success"></ion-icon>
            </ion-item>
          </div>
          <ion-toggle v-if="servicios.length > 0" v-model="pagoManual">Ingresar el monto manualmente</ion-toggle>
        </ion-list>
        <ion-list class="tarjeta">
          <ion-list-header>
            <ion-label>{{ definirTitulo2() }}</ion-label>
          </ion-list-header>
          <div class="contenedor" v-if="pagoSaldo">
            <ion-item lines="none">
              <ion-icon 
                :icon="saldoInsuficiente ? closeCircleOutline : checkmarkCircle"
                :color="saldoInsuficiente ? 'danger' : 'success'" />
              <ion-label>
                <h2>Saldo: ${{ usuario?.cuenta.balance }}</h2>
                <p>{{ saldoInsuficiente ? 'Insuficiente' : 'Disponible' }}</p>
              </ion-label>
            </ion-item>
          </div>
          <div class="contenedor" v-else>
            <ion-item lines="none" v-for="metodo in metodos" :key="metodo.id">
              <ion-icon :icon="cardOutline" />
              <ion-label @click="seleccionarMetodo(metodo)">
                <h2>{{ metodo.marca }} ***{{ metodo.ultimos4 }}</h2>
                <p>Expira {{ metodo.expiracion }}</p>
              </ion-label>
              <ion-icon v-if="metodoSelec && metodoSelec.id == metodo.id" :icon="checkmarkCircle" slot="end" color="success"></ion-icon>
            </ion-item>
          </div>
          <ion-toggle v-model="pagoSaldo">Usar saldo en la cuenta</ion-toggle>
        </ion-list>
        <ion-list class="tarjeta">
          <ion-list-header>
            <ion-label v-if="seleccionValida">
              <h2>Detalles del pago</h2><br>
              <p>Nombre del negocio: {{ empresa?.nombre }}</p>
              <p>Servicio: {{ servicioSelec?.nombre || manualConcept }}</p>
              <p>Método de pago: {{ metodoSelec ? (metodoSelec.marca + "***" + metodoSelec.ultimos4) : 'Pago con saldo' }}</p>
              <p>Total a pagar: ${{ servicioSelec?.precio || manualAmount }}</p>
            </ion-label>
            <ion-label v-else>
              Por favor seleccione un servicio y un método de pago para continuar.
            </ion-label>
          </ion-list-header>
          <ion-grid class="botones-formulario">
            <ion-row>
              <ion-col><ion-button expand="full" class="btn-cancelar" @click="props.back">Cancelar</ion-button></ion-col>
              <ion-col><ion-button expand="full" class="btn-confirmar" @click="confirmarPago" :disabled="isConfirmDisabled">Confirmar</ion-button></ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonListHeader, IonLabel, IonItem, IonToggle, IonInput, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { arrowBack, listCircle, checkmarkCircle, cardOutline, closeCircleOutline  } from 'ionicons/icons';
import { computed, onMounted, ref, watch } from 'vue';
import { useEmpresaStore } from '@/stores/empresaStore';
import { useUsuarioStore } from '@/stores/usuarioStore';
import ModalProps from '@/interface/ModalProps';
import EmpresaService from '@/api/EmpresaService';
import MetodoService from '@/api/MetodoService';
import UserService from '@/api/UserService';
import Servicio from '@/interface/Servicio';
import Empresa from '@/interface/Empresa';
import MetodoPago from '@/interface/MetodoPago';
import UserLogged from '@/interface/UserLogged';

// Store y datos globales
const props = defineProps<ModalProps>();
const empresaStore = useEmpresaStore();
const usuarioStore = useUsuarioStore();

// Empresa y usuario deben si o si estar disponibles para obtener métodos y servicios
// Dde otra manera regresamos a la página anterior
const empresa = ref<Empresa | null>(null);
const usuario = ref<UserLogged | null>(null);
const metodos = ref<MetodoPago[]>([]);
const servicios = ref<Servicio[]>([]);

// Variables para ingresar servicio y pago manual
const pagoManual = ref(false);
const pagoSaldo = ref(false);
const manualAmount = ref<number | null>(null);
const manualConcept = ref<string | null>(null);

// Variables y funciones para seleccionar
const servicioSelec = ref<Servicio | null>(null);
const metodoSelec = ref<MetodoPago | null>(null);

const seleccionarServicio = (servicio: Servicio) => {
  pagoManual.value = false;
  servicioSelec.value = servicio;
}
const seleccionarMetodo = (metodo: MetodoPago) => {
  pagoSaldo.value = false;
  metodoSelec.value = metodo;
}

watch(pagoManual, (newVal) => {
  if (newVal) {
    // al activar monto manual, quitar selección de servicio
    servicioSelec.value = null;
  }
});

watch(pagoSaldo, (newVal) => {
  if (newVal) {
    // al activar pago con saldo, quitar selección de tarjeta
    metodoSelec.value = null;
  }
});

// Validaciones combinadas: selección y saldo
const seleccionValida = computed(() => {
  // Debe existir un servicio (o monto manual) y un método (tarjeta seleccionada o pagoSaldo)
  const hasServiceOrManual = !!(servicioSelec.value || (pagoManual.value && manualAmount.value && manualAmount.value > 0 && manualConcept.value && manualConcept.value.length > 3));
  const hasPaymentMethod = !!(pagoSaldo.value || metodoSelec.value);
  return hasServiceOrManual && hasPaymentMethod;
});

// computed para monto y validación de saldo
const montoActual = computed(() => {
  return pagoManual.value ? (manualAmount.value ?? 0) : (servicioSelec.value?.precio ?? 0);
});

const saldoInsuficiente = computed(() => {
  if (!pagoSaldo.value) return false;
  const balance = usuario.value?.cuenta?.balance ?? 0;
  return montoActual.value > balance;
});

const isConfirmDisabled = computed(() => {
  // Primero validar selección
  if (!seleccionValida.value) return true;

  // Si se usa saldo, validar el balance según el monto (servicio o manual)
  if (pagoSaldo.value) {
    return saldoInsuficiente.value;
  }

  // Si es pago con tarjeta no tiene validación de saldo
  return false;
});

const confirmarPago = () => {

}

const cargarDatos = async () => {
  await setAuthUser();
  setSelectedCompany();
  
  servicios.value = await EmpresaService.obtenerServicios(empresa.value!.id);
  metodos.value = await MetodoService.obtenerMetodos(usuario.value!.id);
}

function definirTitulo1() {
  if (servicios.value.length === 0) return 'No hay servicios disponibles para la empresa seleccionada. Por favor ingresa el monto manualmente.';
  if (pagoManual.value) return 'Ingresa el monto a pagar al negocio seleccionado y el concepto del pago a realizar.';
  return 'Servicios disponibles para el negocio seleccionado.';
}

function definirTitulo2() {
  if (metodos.value.length === 0) return 'No hay tarjetas disponibles. Se usará el saldo disponible en la cuenta.';
  if (pagoSaldo.value) return 'El monto total del servicio será debitado del saldo en tu cuenta.';
  return 'Selecciona el método a utilizar para realizar el pago solicitado.';
}

const setSelectedCompany = () => {
  if (empresaStore.empresaSeleccionada) 
    empresa.value = empresaStore.empresaSeleccionada;
  else props.back();
}

const setAuthUser = async() => {
  if (usuarioStore.usuarioAutenticado){
    usuario.value = usuarioStore.usuarioAutenticado;
  } else {
    const loggedUser = await UserService.loggedUser();
    return loggedUser ? usuario.value = loggedUser : props.back();
  }
}

onMounted(async() => { await cargarDatos() });
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

.botones-formulario {
  width: 100%;
  padding: 0;
  margin-top: 10px;
}

.botones-formulario ion-col {
  padding: 0;
}

.botones-formulario ion-row {
  gap: 6px;
}

.btn-confirmar, .btn-cancelar {
  --color: #FAF9F6;
  --padding-top: 13px;
  --padding-bottom: 13px;
  font-weight: bold;
}

.btn-confirmar {
  --background: #0f89a1;
}

.btn-cancelar {
  --background: #0e7185;
}
</style>