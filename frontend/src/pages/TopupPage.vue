<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back()"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
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
          <h2>$ 1,250.00</h2>
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
                <ion-select-option value="tarjeta">Tarjeta Débito/Crédito</ion-select-option>
                <ion-select-option value="transferencia">Transferencia Bancaria</ion-select-option>
                <ion-select-option value="efectivo">Punto de Pago</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Monto de recarga -->
            <ion-item>
              <ion-label position="stacked">Monto a recargar</ion-label>
              <ion-input 
                type="number" 
                placeholder="0.00" 
                v-model="monto"
              ></ion-input>
            </ion-item>

            <!-- Información de tarjeta -->
            <div v-if="metodoRecarga === 'tarjeta'">
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

            <!-- Información de transferencia -->
            <div v-if="metodoRecarga === 'transferencia'">
              <ion-item>
                <ion-label position="stacked">Número de cuenta origen</ion-label>
                <ion-input 
                  type="text" 
                  placeholder="123456789" 
                  v-model="cuentaOrigen"
                ></ion-input>
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
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons,  IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { arrowBack, card } from 'ionicons/icons';
import { ref } from 'vue';
import ModalProps from '@/interface/ModalProps';

const props = defineProps<ModalProps>();
// Reactive data
const metodoRecarga = ref('tarjeta');
const monto = ref('');
const numeroTarjeta = ref('');
const fechaExpiracion = ref('');
const cvv = ref('');
const cuentaOrigen = ref('');
const montosRapidos = [20, 50, 100, 200];

// Methods
const seleccionarMontoRapido = (montoSeleccionado: number) => {
  monto.value = montoSeleccionado.toString();
};

const procesarRecarga = () => {
  /*if (!monto.value || monto.value.to <= 0) {
    // Aquí podrías mostrar un toast de error
    console.log('Monto inválido');
    return;
  }*/
  
  console.log('Procesando recarga:', {
    metodo: metodoRecarga.value,
    monto: monto.value,
    numeroTarjeta: numeroTarjeta.value,
    fechaExpiracion: fechaExpiracion.value
  });
  
  // Aquí iría la lógica para procesar la recarga
  // Por ahora solo un log
  alert(`Recarga de $${monto.value} procesada exitosamente`);
};

const cancelar = () => {
  // Limpiar formulario
  monto.value = '';
  numeroTarjeta.value = '';
  fechaExpiracion.value = '';
  cvv.value = '';
  cuentaOrigen.value = '';
  
  console.log('Recarga cancelada');
};
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