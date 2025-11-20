<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar-custom">
        <ion-title class="ion-text-center titulo-superior">Banca SV</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" >
      <div class="login-container">
        <div class="logo-container animate-fade">
          <img src="@/assets/banco-logo.png" alt="Logo del Banco" class="logo" />
        </div>
        <div class="login-card">
          <h2>Inicio de Sesión</h2>
          <p>Ingrese sus credenciales para continuar</p>

          <ion-item class="input-item">
            <ion-input v-model="username" label="Usuario" label-placement="floating" placeholder="Ingrese su usuario" />
          </ion-item>
          <ion-item class="input-item">
            <ion-input v-model="password" type="password" label="Contraseña" label-placement="floating" placeholder="Ingrese su contraseña" />
          </ion-item>
          <ion-button expand="block" shape="round" class="btn-login" @click="loginUser"> Iniciar Sesión</ion-button>
          <ion-label router-link="/register">Crear Cuenta</ion-label>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton, IonLabel } from "@ionic/vue";
import { ref } from "vue";
//import { useRouter } from "vue-router";
import UserService from "@/api/UserService";

const userSerivce = new UserService();
const username = ref("");
const password = ref("");
//const router = useRouter();

const loginUser = async () => {
  // Por hacer: validar que los campos no estén vacíos
  
  const success = await userSerivce.login(username.value, password.value)
  if (success) {
    alert('login exitoso')
  } else {
    alert('credenciales incorrectas')
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 107%;
  background: linear-gradient(135deg, #005F73, #0487a1, #53c3da);
  background-size: 150% 150%;
  animation: gradientShift 8s ease infinite;
}

.login-card {
  background: #FAF9F6  ;
  width: 100%;
  max-width: 380px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 30px #006073b6;
  text-align: center;
  border-top: 5px solid #94D2BD ;
}

.login-card h2 {
  color: #3A3A3A ;
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
  --background: #  --background: #FAF9F6;
  --highlight-color-focused: #005F73;
}

.logo {
  width: 260px;
  margin: 8vh 0 5.5vh;
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
  --background-hover: #005F73 ;
  --background-activated: #005F73 ;
  --color: white;
  transition: transform 0.2s ease;
}

.login-btn > * {
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
