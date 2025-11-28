<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Pagar Servicios</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">

      <ion-list class="tarjeta">
        <ion-list-header>
          <ion-label v-if="servicios.length === 0">No hay servicios disponibles para la empresa seleccionada. Por favor ingresa el monto manualmente.</ion-label>
          <ion-label v-else-if="pagoManual">Ingresa el monto a pagar al negocio seleccionado y el concepto del pago a realizar.</ion-label>
          <ion-label v-else>Servicios disponibles para el negocio seleccionado.</ion-label>
        </ion-list-header>

        <div v-if="pagoManual || servicios.length == 0" class="contenedor">
          <ion-item lines="none">
            <ion-input type="number" placeholder="Monto a pagar" v-model="manualAmount"></ion-input>
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
          <ion-label v-if="metodos.length === 0">No hay tarjetas disponibles. Se usará el saldo disponible en la cuenta.</ion-label>
          <ion-label v-else-if="pagoSaldo">El monto total del servicio será debitado del saldo en tu cuenta.</ion-label>
          <ion-label v-else>Selecciona el método a utilizar para realizar el pago solicitado.</ion-label>
        </ion-list-header>

        <div v-if="pagoSaldo || metodos.length == 0" class="contenedor">
          <ion-item lines="none">
            <ion-icon 
              :icon="saldoInsuficiente ? closeCircleOutline : checkmarkCircle"
              :color="saldoInsuficiente ? 'danger' : 'primary'" />
            <ion-label>
              <h2>Saldo: ${{ usuario?.cuenta.balance }}</h2>
              <p>{{ saldoInsuficiente ? 'Insuficiente' : 'Disponible' }}</p>
            </ion-label>
          </ion-item>
        </div>

        <div v-else class="contenedor">
          <ion-item lines="none" v-for="metodo in metodos" :key="metodo.id">
            <ion-icon :icon="cardOutline" />
            <ion-label @click="seleccionarMetodo(metodo)">
              <h2>{{ metodo.marca }} ***{{ metodo.ultimos4 }}</h2>
              <p>Expira {{ metodo.expiracion }}</p>
            </ion-label>
            <ion-icon v-if="metodoSelec && metodoSelec.id == metodo.id" :icon="checkmarkCircle" slot="end" color="success"></ion-icon>
          </ion-item>
        </div>

        <ion-toggle v-if="metodos.length > 0" v-model="pagoSaldo">Usar saldo en la cuenta</ion-toggle>
      </ion-list>

      <ion-list class="tarjeta">
        <ion-list-header>
          <ion-label v-if="seleccionValida">
            <h2>Detalles del pago</h2><br>
            <p>Nombre del negocio: {{ empresa?.nombre }}</p>
            <p>Servicio: {{ servicioSelec?.nombre || manualConcept }}</p>
            <p>Método de pago: {{ metodoUsado }}</p>
            <p>Total a pagar: ${{ montoActual }}</p>
          </ion-label>
          <ion-label v-else>Por favor seleccione un servicio y un método de pago para continuar.</ion-label>
        </ion-list-header>

        <ion-grid class="botones-formulario">
          <ion-row>
            <ion-col><ion-button expand="full" class="btn-cancelar" @click="props.back">Cancelar</ion-button></ion-col>
            <ion-col><ion-button expand="full" class="btn-confirmar" @click="confirmarPago" :disabled="pagoDeshabilitado">Confirmar</ion-button></ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
      <ion-toast :is-open="mostrarToast" :message="mensajeToast" :duration="4000" @didDismiss="mostrarToast = false" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonListHeader, IonLabel, IonItem, IonToggle, IonInput, IonGrid, IonRow, IonCol, IonToast } from '@ionic/vue';
import { arrowBack, listCircle, checkmarkCircle, cardOutline, closeCircleOutline  } from 'ionicons/icons';
import { computed, onMounted, ref, watch } from 'vue';
import { useEmpresaStore } from '@/stores/empresaStore';
import ModalProps from '@/interface/ModalProps';
import EmpresaService from '@/api/EmpresaService';
import MetodoService from '@/api/MetodoService';
import UserService from '@/api/UserService';
import Servicio from '@/interface/Servicio';
import Empresa from '@/interface/Empresa';
import MetodoPago from '@/interface/MetodoPago';
import UserLogged from '@/interface/UserLogged';
import CuentaService from '@/api/CuentaService';
import Transaction from '@/interface/Transaction';
import Notification from "@/interface/Notification";
import TransactionService from '@/api/TransactionService';
import NotificationService from '@/api/NotificationService';

const props = defineProps<ModalProps>();
const empresaStore = useEmpresaStore();
const mostrarToast = ref(false);
const mensajeToast = ref("");

const empresa = ref<Empresa>();
const usuario = ref<UserLogged>();
const metodos = ref<MetodoPago[]>([]);
const servicios = ref<Servicio[]>([]);

const pagoSaldo = ref(false);
const pagoManual = ref(false);
const manualAmount = ref<number | null>(null);
const manualConcept = ref<string | null>(null);

const servicioSelec = ref<Servicio | null>(null);
const metodoSelec = ref<MetodoPago | null>(null);

const metodoUsado = computed(() => {
  return metodoSelec.value ? `${metodoSelec.value.marca} *** ${metodoSelec.value.ultimos4}` : 'Saldo de su cuenta'
});

const seleccionValida = computed(() => {
  const servicioSeleccionado = !!(servicioSelec.value || (pagoManual.value && manualAmount.value && manualAmount.value > 0 && manualConcept.value && manualConcept.value.length > 3));
  const metodoSeleccinado = !!(pagoSaldo.value || metodoSelec.value);
  return servicioSeleccionado && metodoSeleccinado;
});

const montoActual = computed(() => {
  return pagoManual.value ? (manualAmount.value ?? 0) : (servicioSelec.value?.precio ?? 0);
});

const saldoInsuficiente = computed(() => {
  // Solo validar saldo si está usando pago con saldo
  if (!pagoSaldo.value) return false;
  const balance = usuario.value?.cuenta?.balance ?? 0;
  return montoActual.value > balance;
});

const pagoDeshabilitado = computed(() => {
  // Si no hay selección valida, deshabilitamos el botón
  if (!seleccionValida.value) return true;

  // Si se usa saldo, validar que tenga fondos suficientes
  if (pagoSaldo.value) return saldoInsuficiente.value;
  
  // Si es pago con tarjeta no tiene validación de saldo
  return false;
});

const confirmarPago = async () => {
  // Validar de nuevo que todo sea válido
  if (pagoDeshabilitado.value) return;

  // Descontar el monto del saldo
  const saldoActual = usuario.value!.cuenta.balance;
  let nuevoSaldo = saldoActual;
  if (pagoSaldo.value) {
    const success = await CuentaService.debitar(usuario.value!.cuenta.id, montoActual.value);
    if (!success) {
      mensajeToast.value = "Error al intentar debitar el saldo de su cuenta.";
      mostrarToast.value = true;
      return;
    } else {
      nuevoSaldo = nuevoSaldo - montoActual.value;
    }
  }
  
  // Almacenar la transacción
  let newTransaction: Transaction = {
    tipo: 'Pago',
    detalle: `Se pagó un servicio a ${empresa.value!.nombre}`,
    monto: montoActual.value,
    metodo_pago: metodoUsado.value,
    emisor: `Cuenta No. ${usuario.value!.cuenta.numero}`,
    receptor: empresa.value!.nombre,
    saldo_anterior: saldoActual,
    nuevo_saldo: nuevoSaldo,
    estado: 'Completada',
    id_cuenta: usuario.value!.cuenta.id,
  };

  await TransactionService.nuevaTransac(newTransaction);

  // Almacenar la noficicación
  let newNotification: Notification = {
    titulo: 'Se realizó un pago',
    descripcion: `Se realizó el pago de un servicio por $${montoActual.value} a la empresa ${empresa.value!.nombre}. Para ver más detalles revisa tu historial de transacciones.`,
    id_usuario: usuario.value!.id
  };

  await NotificationService.nuevaNotificacion(newNotification);
  //alert para indicar

  // Limpiar selecciones
  servicioSelec.value = null;
  metodoSelec.value = null;
  manualAmount.value = null;
  manualConcept.value = null;
  pagoManual.value = false;
  pagoSaldo.value = false;
}

const cargarDatos = async () => {
  // Si no hay usurio autenticado o empresa seleccionada, regresamos
  const user = await UserService.loggedUser();
  if (!user || !empresaStore.empresaSeleccionada) return props.back();

  usuario.value = user;
  empresa.value = empresaStore.empresaSeleccionada;
  
  servicios.value = await EmpresaService.obtenerServicios(empresa.value!.id);
  metodos.value = await MetodoService.obtenerMetodos(usuario.value!.id);
}

const seleccionarServicio = (servicio: Servicio) => {
  pagoManual.value = false;
  servicioSelec.value = servicio;
}
const seleccionarMetodo = (metodo: MetodoPago) => {
  pagoSaldo.value = false;
  metodoSelec.value = metodo;
}

// al activar manual, quitar lo que se había selecionado
watch(pagoManual, (newVal) => {
  if (newVal) servicioSelec.value = null
});
watch(pagoSaldo, (newVal) => { 
  if (newVal) metodoSelec.value = null 
});

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