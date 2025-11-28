<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Recargar Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Tarjeta de información de cuenta -->
      <ion-card color="light">
        <ion-card-header>
          <ion-card-title>Mi Cuenta Principal</ion-card-title>
          <ion-card-subtitle>Saldo disponible</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <h2>${{ usuario?.cuenta.balance }}</h2>
        </ion-card-content>
      </ion-card>

      <!-- Formulario de recarga -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Realizar Recarga</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <!-- Método de recarga -->
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Método de recarga</ion-label>
              <ion-select v-model="metodoRecarga" interface="action-sheet">
                <ion-select-option value="nueva-tarjeta">Nueva Tarjeta Débito/Crédito</ion-select-option>
                <ion-select-option value="tarjeta-existente">Tarjeta Débito/Crédito existente</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Monto de recarga -->
            <ion-item>
              <ion-label position="stacked">Monto a recargar</ion-label>
              <ion-input type="number" placeholder="0.00" v-model="monto"></ion-input>
            </ion-item>

            <!-- Información de tarjeta -->
            <div v-if="metodoRecarga === 'nueva-tarjeta'">
              <ion-item>
                <ion-label position="stacked">Número de tarjeta</ion-label>
                <ion-input 
                  type="text" 
                  placeholder="**** **** **** 1234" 
                  v-model="numeroTarjeta"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Fecha de expiración</ion-label>
                <ion-input 
                  type="text" 
                  placeholder="MM/AA" 
                  v-model="fechaExpiracion"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">CVV</ion-label>
                <ion-input 
                  type="text" 
                  placeholder="***" 
                  v-model="cvv"
                ></ion-input>
              </ion-item>
            </div>

            <!-- Seleccionar tarjeta existente -->
             <div v-if="metodoRecarga == 'tarjeta-existente'">
              <ion-item>
                <ion-label position="stacked">Para agregar o editar tus métodos de pago, ve a Servicios > Métodos de Pago.</ion-label>
                <br>
                <ion-select v-model="tarjetaSelec" label="Seleccionar tarjeta" placeholder="Seleccionar">
                  <ion-select-option v-for="tarjeta in tarjetas" :key="tarjeta.id">
                    {{ tarjeta.marca }} ***{{ tarjeta.ultimos4 }}
                  </ion-select-option>
                </ion-select>
              </ion-item>
             </div>

          </ion-list>

          <!-- Botones de acción -->
          <ion-button 
            expand="block" 
            color="primary" 
            size="large" 
            style="margin-top: 20px;"
            @click="procesarRecarga"
          >
            <ion-icon slot="start" :icon="card"></ion-icon>
            Recargar ${{ monto || '0.00' }}
          </ion-button>

          <ion-button 
            expand="block" 
            fill="outline" 
            color="medium" 
            style="margin-top: 10px;"
            @click="cancelar"
          >
            Limpiar
          </ion-button>
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
    </ion-content>
    <ion-toast :is-open="mostrarToast" :message="mensajeToast" :duration="2000"  @didDismiss="mostrarToast = false" />
    <ion-alert :is-open="mostrarAlert" :message="mensajeAlert" :buttons="alertButtons" header="Información" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons,  IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonToast, IonAlert } from '@ionic/vue';
import { arrowBack, card } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import ModalProps from '@/interface/ModalProps';
import UserService from '@/api/UserService';
import MetodoService from '@/api/MetodoService';
import UserLogged from '@/interface/UserLogged';
import MetodoPago from '@/interface/MetodoPago';

const props = defineProps<ModalProps>();

const metodoRecarga = ref('nueva-tarjeta');
const monto = ref('');
const numeroTarjeta = ref('');
const fechaExpiracion = ref('');
const cvv = ref('');
const cuentaOrigen = ref('');
const montosRapidos = [20, 50, 100, 200];
const tarjetaSelec = ref('');

const usuario = ref<UserLogged>();
const tarjetas = ref<MetodoPago[]>([]);

const mostrarToast = ref(false);
const mensajeToast = ref("");
const mostrarAlert = ref(false);
const mensajeAlert = ref("");

const alertButtons = [{
    text: 'Aceptar',
    handler: () => {
      setTimeout(() => { props.back() }, 300);
    }
}];

const cargarDatos = async () => {
  const user = await UserService.loggedUser();
  if (user) {
    usuario.value = user;
    tarjetas.value = await MetodoService.obtenerMetodos(user.id);
  }
}

const seleccionarMontoRapido = (montoSeleccionado: number) => {
  monto.value = montoSeleccionado.toString();
};

const procesarRecarga = () => {
  const error = errorValidacion();
  if (error) {
    mensajeToast.value = error;
    mostrarToast.value = true;
    return;
  }
  
  console.log(tarjetaSelec.value);
  
  //alert(`Recarga de $${monto.value} procesada exitosamente`);
};

const errorValidacion = () => {
  if (!monto.value) return "Ingresa el monto a recargar.";
  if (parseFloat(monto.value) <= 0) return "Monto Inválido.";
  if (metodoRecarga.value == 'nueva-tarjeta' && (!numeroTarjeta.value || !fechaExpiracion.value || !cvv.value))
    return "Ingresa los datos de la tarjeta."
  if (metodoRecarga.value == 'tarjeta-existente' && !tarjetaSelec.value)
    return "Selecciona una tarjeta del menú."
  return null;
}

const cancelar = () => {
  monto.value = '';
  numeroTarjeta.value = '';
  fechaExpiracion.value = '';
  cvv.value = '';
  cuentaOrigen.value = '';
  tarjetaSelec.value = '';
};

onMounted(async() => { await cargarDatos() });
</script>

<style scoped>
ion-card {
  margin: 16px 0;
}

ion-card-header {
  padding-bottom: 8px;
}

ion-card-title {
  font-size: 1.2em;
  font-weight: 600;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 16px;
}

ion-button {
  margin: 8px 0;
}

h2 {
  color: var(--ion-color-primary);
  font-weight: bold;
  text-align: center;
  font-size: 1.8em;
  margin: 0;
}
</style>