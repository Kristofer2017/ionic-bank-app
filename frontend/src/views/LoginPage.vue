<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar-custom">
        <ion-title class="ion-text-center titulo-superior">Banca SV</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" >
      <div class="login-container">
        <!-- Logo animado -->
        <div class="logo-container animate-fade">
          <img src="../assets/banco-logo.png" alt="Logo del Banco" class="logo" />
        </div>

        <!-- Tarjeta de login -->
        <div class="login-card">
          <h2>Inicio de Sesión</h2>
          <p>Ingrese sus credenciales para continuar</p>

          <ion-item class="input-item">
            <ion-input
              v-model="username"
              label="Usuario"
              label-placement="floating"
              placeholder="Ingrese su usuario"
            ></ion-input>
          </ion-item>

          <ion-item class="input-item">
            <ion-input
              v-model="password"
              type="password"
              label="Contraseña"
              label-placement="floating"
              placeholder="Ingrese su contraseña"
            ></ion-input>
          </ion-item>

          <ion-button
            expand="block"
            shape="round"
            class="btn-login"
            @click="loginUser"
          >
            Iniciar Sesión
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const username = ref("");
const password = ref("");
const router = useRouter();

const loginUser = async () => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email: username.value,
      password: password.value,
    });

    if (response.data.success) {
      sessionStorage.setItem("usuario", username.value);
      alert(response.data.message);
      router.push("/home");
    } else {
      alert(response.data.message);
    }
  } catch (error: any) {
    alert("Error al conectar con el servidor");
    console.error(error);
  }
};
</script>

<style scoped>
/* Fondo con degradado rojo suave */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 95vh;
  background: linear-gradient(135deg, #005F73, #0487a1, #53c3da);
  background-size: 150% 150%;
  animation: gradientShift 8s ease infinite;
}

/* Tarjeta blanca con borde rojo */
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

/* Inputs */
.input-item {
  --background: #  --background: #FAF9F6;
; 
  margin-bottom: 15px;
  --highlight-color-focused: #005F73 ;
}

/* Logo */

.logo {
  width: 260px;
}

/* Título superior */
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

/* Botón */
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
}
</style>
