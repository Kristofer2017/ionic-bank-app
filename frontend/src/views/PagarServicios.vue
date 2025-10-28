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
      <h1>Selecciona el negocio</h1>
      <div class="contenedor">
        <ion-item class="barra-busqueda" lines="none">
          <ion-searchbar placeholder="Buscar negocio"></ion-searchbar>
        </ion-item>
        <ion-item class="lista-categorias" lines="none">
          <div v-for="categoria in categorias" :key="categoria.id_categoria" >
              <ion-chip class="chip">{{ categoria.nombre_categoria }}</ion-chip>
          </div>
        </ion-item>
        <ion-item class="todos-los-negocios" lines="none">
          <div>
          <h4>Todos los negocios</h4>
          <ion-list class="lista-empresas">
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
          </div>
        </ion-item>

        <ion-grid class="botones-formulario">
          <ion-row>
            <ion-col><ion-button expand="full" shape="round" class="boton">Cancelar</ion-button></ion-col>
            <ion-col><ion-button expand="full" shape="round" class="boton">Confirmar</ion-button></ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSearchbar, IonGrid, IonRow, IonCol, IonChip } from '@ionic/vue';
import { ref, onMounted } from "vue";
import EmpresaService from '@/api/EmpresaService';
import CategoriaService from '@/api/CategoriaService';
import Empresa from '@/interface/Empresa';
import Categoria from '@/interface/Categoria';

const empresaService = new EmpresaService();
const categoriaService = new CategoriaService();

const empresas = ref<Empresa[]>([]);
const categorias = ref<Categoria[]>([]);

onMounted(async () => {
  const dataEmpresas = await empresaService.obtenerEmpresas();
  const dataCategorias = await categoriaService.obtenerCategorias();

  if (dataEmpresas) empresas.value = dataEmpresas;
  if (dataCategorias) categorias.value = dataCategorias;
});

</script>

<style scoped>
ion-content, ion-toolbar, ion-item {
  --background: #FAF9F6;
}

.contenedor {
  padding: 0 35px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  text-align: center;
  margin: 30px auto 20px;
  color: #7e7e7e ;
  font-size: 21px;
}

.barra-busqueda > * {
  padding: 0;
}

.barra-busqueda {
  --padding-start: 0;
  --inner-padding-end: 0;
  border-radius: 15px;
}

.lista-categorias {
  --padding-start: 0;
  --inner-padding-end: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
}
.lista-categorias > div {
  flex: 0 0 auto;
  padding-bottom: 12px;
}

.lista-categorias .chip {
  background: #1292ac;
  color: #FAF9F6;
}

.todos-los-negocios {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.todos-los-negocios > div {
  width: 100%;
  text-align: center;
  color: #646464;
}

.todos-los-negocios > div > h4 {
  margin-top: 0;
}

.lista-empresas {
  max-height: 350px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.lista-empresas > * {
  --background: #fff;
}

.botones-formulario {
  width: 100%;
}

.botones-formulario .boton {
  --background: #005F73;
  --color: #FAF9F6;
  --padding-top: 13px;
  --padding-bottom: 13px;
  font-weight: bold;
}

.botones-formulario {
  padding: 0;
}
</style>
