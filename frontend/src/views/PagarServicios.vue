<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Pagar Servicios</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="contenedor">
        <h1>Elige un Negocio</h1>

        <ion-item>
          <ion-searchbar placeholder="Buscar negocio"></ion-searchbar>
        </ion-item>

        <ion-item>
          <ion-select label="Selecciona una categoría" placeholder="Seleccionar">
            <ion-select-option value="apple">Apple</ion-select-option>
            <ion-select-option value="banana">Banana</ion-select-option>
            <ion-select-option value="orange">Orange</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-list>
          <ion-list-header>
            <ion-label>Todos los negocios</ion-label>
          </ion-list-header>

          <ion-item v-for="empresa in empresas" :key="empresa.id_empresa">
            <ion-label>
              <h2>{{ empresa.nombre_empresa }}</h2>
              <p>{{ empresa.nombre_categoria }}</p>
            </ion-label>
          </ion-item>

          <ion-item v-if="empresas.length === 0">
            <ion-label>No hay empresas registradas</ion-label>
          </ion-item>
        </ion-list>

        <ion-grid>
          <ion-row>
            <ion-col><ion-button expand="full">Cancelar</ion-button></ion-col>
            <ion-col><ion-button expand="full">Confirmar</ion-button></ion-col>
          </ion-row>
        </ion-grid>
        
        
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonSearchbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref, onMounted } from "vue";
import EmpresaService from '@/api/EmpresaService';
import Empresa from '@/interface/Empresa'
const empresaService = new EmpresaService();
const empresas = ref<Empresa[]>([]);

onMounted(async () => {
  const data = await empresaService.obtenerEmpresas();
  if (data) {
    empresas.value = data;
  }
});

</script>

<style scoped>
.contenedor {
  padding: 20px;
}

h1 {
  text-align: center;
  margin: 20px auto;
  color: #555;
  font-size: 25px;
}

#app {
  
}

ion-searchbar {
  padding: 0;
  margin-bottom: 20px;
}

ion-list-header ion-label {
  font-size: 20px;
  font-weight: bold;
}


</style>
