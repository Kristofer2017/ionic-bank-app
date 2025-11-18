<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar-custom">
        <ion-title class="ion-text-center titulo-superior">Banca SV</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="login-container">
        <div class="logo-container animate-fade">
          <img src="@/assets/banco-logo.png" alt="Logo del Banco" class="logo" />
        </div>
        <div class="login-card">
          <h2>Crear Cuenta</h2>
          <p>Ingrese sus datos para continuar</p>
          <ion-item :class="{'input-item': true, 'invalid': !name}">
            <ion-input v-model="name" label="Nombre" label-placement="floating"
              placeholder="Ingrese su nombre completo" />
          </ion-item>
          <ion-item :class="{'input-item': true, 'invalid': !isPhoneValid}">
            <ion-input v-model="phone" label="Teléfono" label-placement="floating"
              placeholder="####-####" />
          </ion-item>
          <ion-item :class="{'input-item': true, 'invalid': !isGmailValid}">
            <ion-input v-model="gmail" label="Correo Electrónico" label-placement="floating" placeholder="Ingrese su Correo Electronico" />
          </ion-item>
          <ion-item :class="{'input-item': true, 'invalid': !isDuiValid}">
            <ion-input v-model="dui" label="DUI" label-placement="floating" placeholder="########-#" />
          </ion-item>
          <ion-item :class="{'input-item': true, 'invalid': !isUsernameValid}">
            <ion-input v-model="username" label="Usuario" label-placement="floating"
              placeholder="nombre.apellido" />
          </ion-item>
          <ion-item :class="{'input-item': true, 'invalid': !password}">
            <ion-input v-model="password" type="password" label="Contraseña" label-placement="floating"
              placeholder="Ingrese su contraseña" />
          </ion-item>
          <ion-button expand="block" shape="round" class="btn-login" @click="registerUser">Registrarse</ion-button>
          <ion-label router-link="/login">Ya tengo una cuenta</ion-label>

        </div>
      </div>
      <ion-alert
      :is-open="mostrarAlert"
      :message="mensajeAlert"
      header="Error de Validación"
      :buttons="['Aceptar']"
      @didDismiss="mostrarAlert = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton, IonLabel, IonAlert } from "@ionic/vue";
import { ref, computed } from "vue";
import UserService from "@/api/UserService";

const userService = new UserService();
const phoneRegex = /^\d{4}-\d{4}$/;
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const duiRegex = /^\d{8}-\d$/;
const usernameRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/;

const mostrarAlert = ref(false);
const mensajeAlert = ref("");

const name = ref("");
const phone = ref("");
const gmail = ref("");
const dui = ref("");
const username = ref("");
const password = ref("");

const showerrors = ref(false);

const isPhoneValid = computed(() => phoneRegex.test(phone.value));
const isGmailValid = computed(() => gmailRegex.test(gmail.value));
const isDuiValid = computed(() => duiRegex.test(dui.value));
const isUsernameValid = computed(() => usernameRegex.test(username.value));

const registerUser = async () => {
  // Para los errores, usar un toast en lugar de alerta
  // La alerta solo se mostrara para confirmar si el registro fue exitoso o no
  showerrors.value = true;

  if (!name.value || !phone.value || !gmail.value || !dui.value || !username.value || !password.value) {
    mensajeAlert.value = "Por favor, complete todos los campos antes de continuar.";
    mostrarAlert.value = true;
    return;
  }

  if (!isPhoneValid.value) {
    mensajeAlert.value = "Teléfono inválido. Use el formato ####-####";
    mostrarAlert.value = true;
    return;
  }
  if (!isGmailValid.value) {
    mensajeAlert.value = "Correo inválido. Solo se acepta @gmail.com";
    mostrarAlert.value = true;
    return;
  }
  if (!isDuiValid.value) {
    mensajeAlert.value = "DUI inválido. Use el formato ########-#";
    mostrarAlert.value = true;
    return;
  }
  if (!isUsernameValid.value) {
    mensajeAlert.value = "Usuario inválido. Use el formato nombre.apellido";
    mostrarAlert.value = true;
    return;
  }
  // Registro del usuario en el backend
  const error = await userService.register({
    nombre: name.value,
    telefono: phone.value,
    email: gmail.value,
    dui: dui.value,
    user: username.value,
    password: password.value
  });

  mensajeAlert.value = error || "Registro Exitoso. Por favor inicie sesión.";
  mostrarAlert.value = true;

  // POR HACER: limpiar los campos y redirigir al login
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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
  margin-bottom: 20px;
}

.login-card ion-label {
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

/* Animación del logo */
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

/* Animación suave del fondo */
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

ion-button {
  margin-top: 30px;
  font-weight: bold;
  --background: #01829c;
  --background-hover: #005F73;
  --background-activated: #005F73;
  --color: white;
  transition: transform 0.2s ease;
}

.login-btn>* {
  padding: 20PX;
}

ion-button:hover {
  transform: scale(1.03);
}

.toolbar-custom {
  --background: #FAF9F6;
}

.btn-login {
  --padding-top: 17px;
  --padding-bottom: 17px;
   margin-bottom: 15px;
}


</style>
