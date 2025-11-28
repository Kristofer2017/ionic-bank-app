<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
        </ion-buttons>
        <ion-title>Métodos de pago</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="form-container">
        <h2 class="form-title">{{ editando? 'Editar':'Agregar' }} método de pago</h2>
        <p v-if="editando">Por seguridad, tendrás que ingresar de nuevo el número de tarjeta y CVV.</p>
        <div class="form-row">
          <ion-label class="label">Nombre del titular</ion-label>
          <ion-input class="input" placeholder="Ej. Juan Pérez" v-model="titular" />
        </div>
        <div class="form-row">
          <ion-label class="label">Número de tarjeta</ion-label>
          <ion-input class="input" type="password" placeholder="xxxx-xxxx-xxxx-xxxx" v-model="tarjeta" />
        </div>
        <div class="form-row">
          <ion-label class="label">Fecha de expiración</ion-label>
          <ion-input class="input" type="text" placeholder="mm/aa" v-model="expiracion" />
        </div>
        <div class="form-row">
          <ion-label class="label">CVV</ion-label>
          <ion-input class="input" type="number" placeholder="xxx" v-model="cvv" />
        </div>
        <div class="form-row">
          <ion-label class="label">Marca</ion-label>
          <ion-select class="input" placeholder="Selecciona la marca" v-model="marca">
            <ion-select-option value="Visa">Visa</ion-select-option>
            <ion-select-option value="Mastercard">Mastercard</ion-select-option>
            <ion-select-option value="American Express">American Express</ion-select-option>
            <ion-select-option value="Discover">Discover</ion-select-option>
          </ion-select>
        </div>
        <div class="boton-row">
          <ion-button fill="outline" color="medium" @click="props.back">Cancelar</ion-button>
          <ion-button color="primary" @click="guardarTarjeta">{{ editando? 'Actualizar':'Guardar' }}</ion-button>
        </div>
      </div>
      <ion-toast :is-open="mostrarToast" :message="mensajeToast" :duration="2000"  @didDismiss="mostrarToast = false" />
      <ion-alert :is-open="mostrarAlert" :message="mensajeAlert" :buttons="alertButtons" header="Información" />
    </ion-content>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonLabel, IonInput, IonSelect, IonSelectOption, IonToast, IonAlert } from '@ionic/vue'
import { arrowBack } from 'ionicons/icons';
import { useMetodoStore } from '@/stores/metodoStore';
import { onMounted, ref } from 'vue';
import ModalProps from '@/interface/ModalProps';
import MetodoService from '@/api/MetodoService';
import UserService from '@/api/UserService';
import MetodoRegister from '@/interface/MetodoRegister';
import MetodoPago from '@/interface/MetodoPago';

// Stores y propiedades globales
const props = defineProps<ModalProps>();
const metodoStore = useMetodoStore();

// Inputs del usuario
const titular = ref("");
const tarjeta = ref("");
const expiracion = ref("");
const cvv = ref("");
const marca = ref("");

// Para verificar si se esta editando o agregando
const editando = ref(false);
const tarjetaEditar = ref<MetodoPago | null>(null);

// Mensajes
const mostrarToast = ref(false);
const mensajeToast = ref("");
const mostrarAlert = ref(false);
const mensajeAlert = ref("");

// Validaciones
const tarjetaRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
const expiracionRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvvRegex = /^\d{3}$/;

const tarjetaValid = () => tarjetaRegex.test(tarjeta.value);
const expiracionValid = () => expiracionRegex.test(expiracion.value);
const cvvValid = () => cvvRegex.test(cvv.value);

const cargarDatos = async () => {
  const tarjetaE = metodoStore.metodoEditar;
  if (tarjetaE) {
    editando.value = true;
    tarjetaEditar.value = tarjetaE;
    poblarCampos(tarjetaE);
  }
}

const guardarTarjeta = async () => {
  const error = errorValidacion();
  if (error) { mostrar('toast', error); return; }

  const user = await UserService.loggedUser();
  if (!user) return props.back();

  if (editando.value) {
    let metodoEditar: MetodoPago = {
      id: tarjetaEditar.value!.id,
      titular: titular.value,
      ultimos4: tarjeta.value.split("-").pop()!,
      marca: marca.value,
      expiracion: expiracion.value
    };

    const success = await MetodoService.actualizarMetodo(metodoEditar);
    if (success) mostrar('alert', 'La tarjeta fué actualizada con éxito.')
    else mostrar('toast', 'Error al actualizar la tarjeta, inténtalo más tarde.')

  } else {
    let metodoRegistrar: MetodoRegister = {
      titular: titular.value,
      ultimos4: tarjeta.value.split("-").pop()!,
      marca: marca.value,
      expiracion: expiracion.value,
      id_usuario: user.id
    };

    const success = await MetodoService.agregarMetodo(metodoRegistrar);
    if (success) mostrar('alert', 'La tarjeta fué rigistrada con éxito.') 
    else mostrar('toast', 'Error al guardar la tarjeta, inténtalo más tarde.')
  }
  
  metodoStore.refrescarDatos = true;
  limpiarcampos();
}

const errorValidacion = () => {
  if (!titular.value || !tarjeta.value || !expiracion.value || !cvv.value || !marca.value)
    return "Por favor, complete todos los campos antes de continuar.";
  if (!tarjetaValid()) return "El número de tarjeta no coincide con el formato solicitado.";
  if (!expiracionValid()) return "La fecha de expiración no es válida.";
  if (!cvvValid()) return "El CVV ingresado no es válido";
  return expiracionValida(expiracion.value);
}

const expiracionValida = (exp: string) => {
  const [mesStr, anioStr] = exp.split('/');
  const mes = parseInt(mesStr, 10);
  const anio = parseInt("20" + anioStr, 10);

  const ahora = new Date();
  const anioActual = ahora.getFullYear();
  const mesActual = ahora.getMonth() + 1;

  // Año debe ser mayor al actual
  if (anio < anioActual) return "Tarjeta expirada";

  // Si es mismo año, debe tener mes mayor al actual
  if (anio === anioActual && mes <= mesActual) return "Tarjeta expirada";

  return null;
}

const limpiarcampos = () => {
  titular.value = "";
  tarjeta.value = "";
  expiracion.value = "";
  cvv.value = "";
  marca.value = "";
}

const poblarCampos = (card: MetodoPago) => {
  titular.value = card.titular;
  expiracion.value = card.expiracion;
  marca.value = card.marca;
}

const mostrar = (tipo: string, mensaje: string) => {
  if (tipo === "toast") {
    mensajeToast.value = mensaje;
    mostrarToast.value = true;
  } else if (tipo === "alert") {
    mensajeAlert.value = mensaje;
    mostrarAlert.value = true;
  }
}

const alertButtons = [{ text: 'Aceptar', handler: () => { setTimeout(() => { props.back() }, 300) }}];
onMounted(async() => { await cargarDatos() });
</script>

<style scoped>
.form-container {
  margin: 1em;
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  
  font-size: 1.6rem;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 600;
  color: #005F73;
  margin-bottom: 1.3rem;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

.label {
  width: 45%;
  font-weight: 500;
  color: #3A3A3A;
}

.input {
  width: 50%;
}

.radio-group {
  display: flex;
  gap: 2rem;
  width: 50%;
}
.radio-group ion-label {
  margin-left: 10px;
}

.boton-row {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

p {
  color: #555;
  font-size: 15px;
}
</style>
