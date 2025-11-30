<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Enviar</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Contenido principal -->
    <ion-content class="ion-padding">
      <!-- Sección: Cuenta destino -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Cuenta destino</ion-card-title>
        </ion-card-header>
        <ion-card-content>

          <!-- Campo manual -->
          <ion-item class="espaciado-item">
            <ion-label position="stacked">Número de cuenta</ion-label>
            <ion-input v-model="cuentaDestino" type="text" />
          </ion-item>
          <ion-button expand="block" color="primary" @click="buscarCuenta">Buscar</ion-button>
        </ion-card-content>
      </ion-card>

      <!-- Sección: Datos del destinatario -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Destinatario encontrado</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item lines="none">
            <ion-label>
            <p>Nombre: {{ nombre }}</p>
            </ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>
            <p>Tipo de cuenta: {{ tipoCuenta }}</p>
            </ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <!-- Sección: Monto -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Monto a transferir</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item class="espaciado-item">
            <ion-label style="padding-right: 15px;">$</ion-label>
            <ion-input v-model="monto" type="number" min="0.01" placeholder="0.00" />
          </ion-item>
        </ion-card-content>
      </ion-card>

      <!-- Montos rápidos -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Monto Rápido</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="6" v-for="monto in montosRapidos" :key="monto">
                <ion-button 
                  expand="block" 
                  fill="outline" 
                  color="primary"
                  @click="seleccionarMontoRapido(monto)"
                >
                  ${{ monto }}.00
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <!-- Sección: Acciones -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Acciones</ion-card-title>
          <ion-label style="margin-top: 10px;">
            <span style="color: red;">*</span>
            El monto a enviar será debitado del saldo en tu cuenta.
            Verifica tu saldo antes de continuar.
          </ion-label>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button @click="limpiar" expand="block" color="medium" fill="outline">
                  Limpiar
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button @click="confirmarTransferencia" :disabled="!formularioValido" expand="block">
                  Confirmar
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <!-- Alertas y Toast -->
      <ion-toast :is-open="mostrarToast" :message="mensajeToast" :duration="2000"  @didDismiss="mostrarToast = false" />
      <ion-alert :is-open="alertaInformacion" :message="mensajeInfo" :buttons="botonesInfo" header="Información" />
      <ion-alert :is-open="alertaConfirmacion" :message="mensajeConf" :buttons="botonesConfirm" header="Confirmación" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonAlert, IonToast, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { ref, computed } from 'vue';
import { arrowBack } from 'ionicons/icons';
import ModalProps from '@/interface/ModalProps';
import CuentaService from '@/api/CuentaService';
import UserService from '@/api/UserService';
import NotificationService from '@/api/NotificationService';
import TransactionService from '@/api/TransactionService';

const props = defineProps<ModalProps>();

// Campos del formulario
const cuentaDestino = ref('');
const nombre = ref('');
const tipoCuenta = ref<string | null>(null);
const monto = ref<number | null>(null);
const montosRapidos = [20, 50, 100, 200];
const idCuentaDestino = ref();

// Estados de feedback
const mostrarToast = ref(false);
const mensajeToast = ref("");
const alertaInformacion = ref(false);
const mensajeInfo = ref("");
const alertaConfirmacion = ref(false);
const mensajeConf = ref("");

// Validación
const formularioValido = computed(() =>
  cuentaDestino.value.trim() !== '' &&
  nombre.value.trim() !== '' &&
  tipoCuenta.value !== null &&
  monto.value !== null &&
  monto.value > 0
);

// Limpiar datos
function limpiar() {
  cuentaDestino.value = '';
  nombre.value = '';
  tipoCuenta.value = null;
  monto.value = null;
}

// Funciones
const seleccionarMontoRapido = (montoSeleccionado: number) => {
  monto.value = montoSeleccionado;
};

async function buscarCuenta() {
  if (cuentaDestino.value.trim() === '') {
    mensajeToast.value = 'Ingresa la cuenta de destino.';
    mostrarToast.value = true;
    return;
  }

  const usuarioOrigen = await UserService.loggedUser();
  if (!usuarioOrigen) return;

  // Validación por si intenta buscar su propio número de cuenta
  if (cuentaDestino.value == usuarioOrigen.cuenta.numero) {
    mensajeToast.value = 'Ingresa otro número de cuenta.';
    mostrarToast.value = true;
    return;
  }

  const usuarioEncontrado = await CuentaService.buscar(cuentaDestino.value);
  if (usuarioEncontrado) {
    nombre.value = usuarioEncontrado.nombre;
    tipoCuenta.value = usuarioEncontrado.cuenta.tipo;
    idCuentaDestino.value = usuarioEncontrado.cuenta.id;
  } else {
    mensajeToast.value = 'No se encotró la cuenta.';
    mostrarToast.value = true;
  }
}

async function confirmarTransferencia() {
  if (!formularioValido.value) {
    mensajeToast.value = 'Verifica que los datos ingresados sean válidos.';
    mostrarToast.value = true;
    return;
  }
  const user = await UserService.loggedUser();
  if (!user) return;
  if (Number(monto.value) > Number(user.cuenta.balance)){
    mensajeToast.value = 'No cuentas con los fondos suficientes.';
    mostrarToast.value = true;
    return;
  }
  
  mensajeConf.value = `¿Quieres enviar $${monto.value} a ${nombre.value}?`
  alertaConfirmacion.value = true;
}

async function transferirFondos() {
  const usuarioOrigen = await UserService.loggedUser();

  // Extra capa de validación
  if (!usuarioOrigen) return;
  if(!cuentaDestino.value) return;
  if(!idCuentaDestino.value) return;
  if(!monto.value) return;

  // Variables que nos servirán para la transacción
  const fecha = new Date().toLocaleDateString();
  const saldoActual = usuarioOrigen.cuenta.balance;
  let nuevoSaldo = saldoActual;
  let success = true;

  success = await CuentaService.transferir(usuarioOrigen.cuenta.id, idCuentaDestino.value, monto.value);

  if (!success) {
    mensajeToast.value = 'Error al enviar fondos.';
    mostrarToast.value = true;
    return;
  }
  nuevoSaldo = Number(saldoActual) - Number(monto.value);

  // Almacenar la noficicación
  success = await NotificationService.nuevaNotificacion({
    titulo: 'Envío de Fondos',
    descripcion: `Se enviaron $${monto.value} a ${nombre.value}. Para ver más detalles revisa tu historial de transacciones.`,
    id_usuario: usuarioOrigen.id
  });
  
  // Almacenar la transacción
  success = await TransactionService.nuevaTransac({
    tipo: 'Transferencia',
    titulo: `Se enviaron $${monto.value} a ${nombre.value}`,
    detalle: `Se realizó la transferencia de $${monto.value} desde la cuenta ${usuarioOrigen.cuenta.numero} a ${nombre.value} con número de cuenta ${cuentaDestino.value} en la fecha ${fecha}.`,
    monto: monto.value,
    metodo_pago: 'Saldo en Cuenta',
    emisor: `Cuenta No. ${usuarioOrigen.cuenta.numero}`,
    receptor: `Cuenta No. ${cuentaDestino.value}`,
    saldo_anterior: saldoActual,
    nuevo_saldo: nuevoSaldo,
    id_cuenta: usuarioOrigen.cuenta.id,
  });

  // Feedback al usuario
  if (success) {
    mensajeInfo.value = "Fondos enviados correctamente."
    alertaInformacion.value = true;
  } else {
    mensajeToast.value = "Hubo un error enviando los fondos.";
    mostrarToast.value = true;
  }
}

// Botones de alertas
const botonesInfo = [{ 
  text: 'Aceptar', role: 'confirm', handler: () => { 
    alertaInformacion.value = false;
    setTimeout(() => { props.back() }, 200);
  }
}];

const botonesConfirm = [
  { text: 'Cancelar', role: 'cancel', handler: () => { alertaConfirmacion.value = false }},
  { text: 'Confirmar', role: 'confirm', handler: async () => { 
    alertaConfirmacion.value = false;
    await transferirFondos();
  }}
];
</script>

<style scoped>
ion-card {
  margin: 16px 0;
}

ion-card-title {
  font-size: 1.1em;
  font-weight: 600;
}

.espaciado-item {
  --padding-start: 12px;
  --inner-padding-end: 12px;
  margin-bottom: 16px;
  --min-height: 60px;
}
</style>