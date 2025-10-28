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
          <ion-searchbar v-model="textoBusqueda" placeholder="Buscar negocio"></ion-searchbar>
        </ion-item>
        <ion-item class="lista-categorias" lines="none">
          <div v-for="categoria in categoriasFiltradas" :key="categoria.id_categoria" >
              <ion-chip class="chip">
                <ion-label @click="seleccionarCategoria(categoria.nombre_categoria)">
                  {{ categoria.nombre_categoria }}
                </ion-label>
                <ion-icon @click="limpiarFiltrado()" :icon="closeCircle"></ion-icon>
              </ion-chip>
          </div>
        </ion-item>
        <ion-item class="todos-los-negocios" lines="none">
          <div>
          <h4>Todos los negocios</h4>
          <ion-list class="lista-empresas">
            <ion-item v-for="empresa in empresasFiltradas" :key="empresa.id_empresa">
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
import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSearchbar, IonGrid, IonRow, IonCol, IonChip, IonIcon } from '@ionic/vue';
import { closeCircle } from 'ionicons/icons';
import { ref, onMounted, computed } from "vue";
import EmpresaService from '@/api/EmpresaService';
import CategoriaService from '@/api/CategoriaService';
import Empresa from '@/interface/Empresa';
import Categoria from '@/interface/Categoria';

const empresaService = new EmpresaService();
const categoriaService = new CategoriaService();

const empresas = ref<Empresa[]>([]);
const categorias = ref<Categoria[]>([]);
const categoriaSeleccionada = ref<string | null>(null)
const textoBusqueda = ref<string>('')

onMounted(async () => {
  const dataEmpresas = await empresaService.obtenerEmpresas();
  const dataCategorias = await categoriaService.obtenerCategorias();

  if (dataEmpresas) empresas.value = dataEmpresas;
  if (dataCategorias) categorias.value = dataCategorias;
});

const empresasFiltradas = computed(() => {
  let resultado = empresas.value

  // Filtro por categoría (si hay una seleccionada)
  if (categoriaSeleccionada.value) {
    resultado = resultado.filter(
      (empresa) => empresa.nombre_categoria === categoriaSeleccionada.value
    )
  }

  // Filtro por texto de búsqueda (nombre de la empresa)
  if (textoBusqueda.value.trim() !== '') {
    const texto = textoBusqueda.value.toLowerCase()
    resultado = resultado.filter((empresa) =>
      empresa.nombre_empresa.toLowerCase().includes(texto)
    )
  }

  return resultado
})

const categoriasFiltradas = computed(() => {
  if (!categoriaSeleccionada.value) {
    return categorias.value
  }
  return categorias.value.filter(
    (categoria) => categoria.nombre_categoria === categoriaSeleccionada.value
  )
})

function seleccionarCategoria(categoria: string) {
  categoriaSeleccionada.value = categoria;
}

function limpiarFiltrado() {
  categoriaSeleccionada.value = null
}
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
}

.lista-categorias .chip > * {
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
  height: 350px;
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
