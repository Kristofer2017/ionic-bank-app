<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar-custom">
        <ion-title class="ion-text-center titulo-superior">Banca SV</ion-title>
      </ion-toolbar>
    </ion-header>

    <div class="login-container">
      <div class="login-card">
        <h2>Crear Cuenta</h2>
        <p>Ingrese sus datos para continuar</p>
        <ion-item class="input-item">
          <ion-input v-model="name" label="Nombre" label-placement="floating" type="text"
            placeholder="Ingrese su nombre y apellido" />
        </ion-item>
        <ion-item class="input-item">
          <ion-input v-model="phone" label="Teléfono" label-placement="floating" type="tel"
            placeholder="0000-0000" />
        </ion-item>
        <ion-item class="input-item">
          <ion-input v-model="email" label="Correo Electrónico" label-placement="floating" type="email"
            placeholder="correo@ejemplo.com" />
        </ion-item>
        <ion-item class="input-item">
          <ion-input v-model="dui" label="DUI" label-placement="floating" type="tel" 
            placeholder="00000000-0" />
        </ion-item>
        <ion-item class="input-item">
          <ion-select label="Selecciona el tipo de cuenta" v-model="tipo">
            <ion-select-option value="Ahorro">Ahorro</ion-select-option>
            <ion-select-option value="Corriente">Corriente</ion-select-option>
            <ion-select-option value="Planillera">Planillera</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="input-item">
          <ion-input v-model="username" label="Usuario" label-placement="floating" type="text"
            placeholder="nombre.apellido" />
        </ion-item>
        <ion-item class="input-item">
          <ion-input v-model="password" label="Contraseña" label-placement="floating" type="password"
            placeholder="Crea una contraseña" />
        </ion-item>
        <ion-button expand="block" shape="round" class="btn-login" @click="registerUser">Registrarse</ion-button>
        <ion-label router-link="/login">Ya tengo una cuenta</ion-label>
      </div>
    </div>
    <ion-toast :is-open="mostrarToast" :message="mensajeToast" :duration="2000"  @didDismiss="mostrarToast = false" color="light" />
    <ion-alert :is-open="mostrarAlert" :message="mensajeAlert" :buttons="alertButtons" header="Información" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonItem, IonButton, IonLabel, IonToast, IonAlert, IonSelect, IonSelectOption } from "@ionic/vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import UserService from "@/api/UserService";

const router = useRouter();
const name = ref("");
const phone = ref("");
const email = ref("");
const dui = ref("");
const tipo = ref("");
const username = ref("");
const password = ref("");

const phoneValid = () => /^\d{4}-\d{4}$/.test(phone.value);
const emailValid = () => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email.value);
const duiValid = () => /^\d{8}-\d$/.test(dui.value);
const userValid = () => /^[a-zA-Z]+\.[a-zA-Z]+$/.test(username.value);
const mostrar = (tipo: string, mensaje: string) => {
  if (tipo === "toast") {
    mensajeToast.value = mensaje;
    mostrarToast.value = true;
  } else if (tipo === "alert") {
    mensajeAlert.value = mensaje;
    mostrarAlert.value = true;
  }
}

const mostrarToast = ref(false);
const mensajeToast = ref("");
const mostrarAlert = ref(false);
const mensajeAlert = ref("");
const alertButtons = [{
    text: 'Aceptar',
    handler: () => {
      setTimeout(() => { router.push('/login') }, 300);
    }
}];

const registerUser = async () => {
  let error = errorValidacion();

  if (error) { mostrar('toast', error); return; }

  error = await UserService.register({
    nombre: name.value,
    telefono: phone.value,
    email: email.value,
    dui: dui.value,
    tipo: tipo.value,
    user: username.value,
    password: password.value
  });

  if (error) { mostrar('toast', error); return; }

  mostrar('alert', 'Registro Exitoso. Por favor inicie sesión.')
  limpiarcampos();
}

const errorValidacion = () => {
  if (!name.value || !phone.value || !email.value || !dui.value || !tipo.value || !username.value || !password.value)
    return "Por favor, complete todos los campos antes de continuar.";
  if (!phoneValid()) return "Teléfono inválido. Use el formato solicitado.";
  if (!emailValid()) return "Por favor, ingresa un correo válido.";
  if (!duiValid()) return "DUI inválido. Use el formato solicitado.";
  if (!userValid()) return "Usuario inválido. Use el formato nombre.apellido";
  return null;
}

const limpiarcampos = () => {
  name.value = "";
  phone.value = "";
  email.value = "";
  dui.value = "";
  tipo.value = "";
  username.value = "";
  password.value = "";
}
</script>

<style scoped>
.login-container {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3.4em;
  background: linear-gradient(135deg, #005F73, #0487a1, #53c3da);
  background-size: 150% 150%;
  animation: gradientShift 8s ease infinite;
}

.login-card {
  background: #FAF9F6;
  width: 100%;
  max-width: 380px;
  padding: 15px 30px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 30px #006073b6;
  text-align: center;
  border-top: 5px solid #94D2BD;
}

.login-card h2 {
  color: #3A3A3A;
  margin-bottom: 8px;
}

.login-card p {
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
  margin-bottom: 15px;
}

.login-card > ion-label {
  text-decoration: underline;
  color: #005F73;
}

.input-item {
  margin-bottom: 15px;
  --background: # --background: #FAF9F6;
  --highlight-color-focused: #005F73;
}

.logo {
  width: 260px;
  margin: 3.5vh 0 1vh;
}

.titulo-superior {
  color: #005F73;
  font-weight: bold;
}

.btn-login {
  --background: #01829c;
  --background-hover: #005F73;
  --background-activated: #005F73;
  --color: white;
  --padding-top: 17px;
  --padding-bottom: 17px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: bold;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade {
  animation: fadeInUp 1s ease-out;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>