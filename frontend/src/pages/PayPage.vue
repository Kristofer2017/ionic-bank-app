<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
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
          <div v-for="categoria in categoriasFiltradas" :key="categoria.id" >
              <ion-chip class="chip">
                <ion-label @click="seleccionarCategoria(categoria.nombre)">{{ categoria.nombre }}</ion-label>
                <ion-icon @click="limpiarFiltrado()" :icon="closeCircle"></ion-icon>
              </ion-chip>
          </div>
        </ion-item>
        <ion-item class="todos-los-negocios" lines="none">
          <div>
          <h4>Todos los negocios</h4>
          <ion-list class="lista-empresas">
            <ion-item v-for="empresa in empresasFiltradas" :key="empresa.id">
              <ion-label @click="seleccionarEmpresa(empresa)">
                <h2>{{ empresa.nombre }}</h2>
                <p>{{ empresa.categoria.nombre }}</p>
              </ion-label>
              <ion-icon v-if="empresaSeleccionada && empresaSeleccionada.id == empresa.id" color="success" slot="end" :icon="checkmarkCircle" />
            </ion-item>
            <ion-item v-if="empresasFiltradas.length === 0" lines="none">
              <ion-label>No se encontraron negocios</ion-label>
            </ion-item>
          </ion-list>
          </div>
        </ion-item>
        <ion-grid class="botones-formulario">
          <ion-row>
            <ion-col><ion-button expand="full" class="btn-cancelar" @click="props.back">Cancelar</ion-button></ion-col>
            <ion-col><ion-button expand="full" class="btn-continuar" @click="continuar">Continuar</ion-button></ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <ion-toast :is-open="mostrarToast" :message="mensajeToast" :duration="4000" @didDismiss="mostrarToast = false" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonPage, IonList, IonItem, IonLabel, IonSearchbar, IonGrid, IonRow, IonCol, IonChip, IonIcon, IonToast } from '@ionic/vue';
import { closeCircle, checkmarkCircle, arrowBack } from 'ionicons/icons';
import { ref, onMounted, computed } from 'vue';
import { useEmpresaStore } from '@/stores/empresaStore';
import PayServicePage from '@/pages/PayServicePage.vue';
import EmpresaService from '@/api/EmpresaService';
import Empresa from '@/interface/Empresa';
import Categoria from '@/interface/Categoria';
import ModalProps from '@/interface/ModalProps';

const empresas = ref<Empresa[]>([]);
const categorias = ref<Categoria[]>([]);
const empresaSeleccionada = ref<Empresa | null>(null);
const categoriaSeleccionada = ref<string | null>(null);
const props = defineProps<ModalProps>();
const empresaStore = useEmpresaStore();
const textoBusqueda = ref<string>('');
const mostrarToast = ref(false);
const mensajeToast = ref("");

const cargarDatos = async () => {
  empresas.value = await EmpresaService.obtenerEmpresas();
  categorias.value = await EmpresaService.obtenerCategorias();
}

const empresasFiltradas = computed(() => {
  let resultado = empresas.value;

  if (categoriaSeleccionada.value) {
    resultado = resultado.filter( // Filtro por categoría
      (empresa) => empresa.categoria.nombre === categoriaSeleccionada.value
    );
  }
  if (textoBusqueda.value.trim() !== '') {
    const texto = textoBusqueda.value.toLowerCase();
    resultado = resultado.filter((empresa) => // Filtro por búsqueda
      empresa.nombre.toLowerCase().includes(texto)
    );
  }
  return resultado;
})

const categoriasFiltradas = computed(() => {
  if (!categoriaSeleccionada.value) {
    return categorias.value
  }
  return categorias.value.filter(
    (categoria) => categoria.nombre === categoriaSeleccionada.value
  )
})

const continuar = () => {
  if (!empresaSeleccionada.value) {
    mensajeToast.value = "Debe seleccionar una empresa antes de continuar";
    mostrarToast.value = true;
    return;
  }
  empresaStore.setEmpresaSelec(empresaSeleccionada.value);
  props.nextPage(PayServicePage);
}

const limpiarFiltrado = () => categoriaSeleccionada.value = null;
const seleccionarCategoria = (categoria: string) => categoriaSeleccionada.value = categoria;
const seleccionarEmpresa = (empresa: Empresa) => empresaSeleccionada.value = empresa;

onMounted(async() => { await cargarDatos() });
</script>

<style scoped>
ion-item {
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
  padding: 0;
}

.btn-continuar, .btn-cancelar {
  --color: #FAF9F6;
  --padding-top: 13px;
  --padding-bottom: 13px;
  font-weight: bold;
}

.btn-continuar {
  --background: #0f89a1;
}

.btn-cancelar {
  --background: #0e7185;
}
</style>
