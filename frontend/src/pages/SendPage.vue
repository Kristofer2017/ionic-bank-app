<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Transferir</ion-title>
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

          <!-- Botón buscar -->
          <ion-button expand="block" color="primary" @click="buscarCuenta">
            Buscar
          </ion-button>
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
            <p>Nombre: </p>
            </ion-label>
            
          </ion-item>
          <ion-item lines="none">
            <ion-label>
            <p>Tipo de cuenta: </p>
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

      <!-- Sección: Acciones -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Acciones</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button expand="block" color="medium" fill="outline" @click="cancelar">
                  Cancelar
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button
                  expand="block"
                  @click="confirmarTransferencia"
                  :disabled="!formularioValido"
                >
                  Confirmar
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <!-- Alert de éxito -->
      <ion-alert
        :is-open="alertaVisible"
        header="Transferencia realizada"
        message="La transferencia se ha completado exitosamente."
        :buttons="['OK']"
        @didDismiss="alertaVisible = false"
      />

      <!-- Toast de error -->
      <ion-toast
        :is-open="toastVisible"
        message="Error: verifica los campos requeridos."
        duration="2000"
        color="danger"
        @didDismiss="toastVisible = false"
      />

      <!-- Alert para guardar cuenta -->
      <ion-alert
        :is-open="alertaGuardarVisible"
        header="Guardar cuenta"
        message="¿Deseas guardar esta cuenta para futuras transferencias?"
        :buttons="[
          { text: 'No', role: 'cancel', handler: () => (alertaGuardarVisible = false) },
          { text: 'Sí', handler: guardarCuenta }
        ]"
        @didDismiss="alertaGuardarVisible = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonAlert, IonToast, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { ref, computed } from 'vue';
import { arrowBack } from 'ionicons/icons';
import ModalProps from '@/interface/ModalProps';

const props = defineProps<ModalProps>();

// Campos del formulario
const cuentaDestino = ref('');
const nombre = ref('');
const tipoCuenta = ref<string | null>(null);
const monto = ref<number | null>(null);

// Lista de cuentas guardadas
const cuentasGuardadas = ref<{ numero: string; nombre: string }[]>([]);

// Estados de feedback
const alertaVisible = ref(false);
const toastVisible = ref(false);
const alertaGuardarVisible = ref(false);

// Validación
const formularioValido = computed(() =>
  cuentaDestino.value.trim() !== '' &&
  nombre.value.trim() !== '' &&
  tipoCuenta.value !== null &&
  monto.value !== null &&
  monto.value > 0
);

// Funciones
function buscarCuenta() {
  if (cuentaDestino.value.trim() === '') {
    toastVisible.value = true;
  }
}

function cancelar() {
  cuentaDestino.value = '';
  nombre.value = '';
  tipoCuenta.value = null;
  monto.value = null;
}

function confirmarTransferencia() {
  if (!formularioValido.value) {
    toastVisible.value = true;
    return;
  }

  // Preguntar si se quiere guardar la cuenta si no existe
  const existe = cuentasGuardadas.value.some(c => c.numero === cuentaDestino.value);
  if (!existe) {
    alertaGuardarVisible.value = true;
  } else {
    alertaVisible.value = true;
  }
}

function guardarCuenta() {
  cuentasGuardadas.value.push({
    numero: cuentaDestino.value,
    nombre: nombre.value || 'Sin nombre'
  });
  alertaGuardarVisible.value = false;
  alertaVisible.value = true;
}
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