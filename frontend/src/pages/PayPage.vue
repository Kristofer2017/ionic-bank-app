<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="props.back()"><ion-icon slot="icon-only" :icon="arrowBack"/></ion-button>
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
                <ion-label @click="seleccionarCategoria(categoria.nombre_categoria)">{{ categoria.nombre_categoria }}</ion-label>
                <ion-icon @click="limpiarFiltrado()" :icon="closeCircle"></ion-icon>
              </ion-chip>
          </div>
        </ion-item>
        <ion-item class="todos-los-negocios" lines="none">
          <div>
          <h4>Todos los negocios</h4>
          <ion-list class="lista-empresas">
            <ion-item v-for="empresa in empresasFiltradas" :key="empresa.id_empresa">
              <ion-label @click="seleccionarEmpresa(empresa)">
                <h2>{{ empresa.nombre_empresa }}</h2>
                <p>{{ empresa.nombre_categoria }}</p>
              </ion-label>
              <ion-icon v-if="empresaSeleccionada && empresaSeleccionada.id_empresa == empresa.id_empresa" color="success" slot="end" :icon="checkmarkCircle" />
            </ion-item>
            <ion-item v-if="empresasFiltradas.length === 0" lines="none">
              <ion-label>No se encontraron negocios</ion-label>
            </ion-item>
          </ion-list>
          </div>
        </ion-item>
        <ion-grid class="botones-formulario">
          <ion-row>
            <ion-col><ion-button expand="full" class="btn-cancelar" @click="cancelar">Cancelar</ion-button></ion-col>
            <ion-col><ion-button expand="full" class="btn-continuar" @click="continuar">Continuar</ion-button></ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <ion-toast :is-open="isOpenToast" :message="msgToast" :duration="5000" @didDismiss="setOpenToast(false)" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { modalController, IonHeader, IonToolbar, IonTitle, IonButtons ,IonButton, IonContent, IonPage, IonList, IonItem, IonLabel, IonSearchbar, IonGrid, IonRow, IonCol, IonChip, IonIcon, IonToast } from '@ionic/vue';
import { closeCircle, checkmarkCircle, arrowBack } from 'ionicons/icons';
import { ref, onMounted, computed } from 'vue';
import { useEmpresaStore } from '@/stores/empresaStore';
import PayServicePage from '@/pages/PayServicePage.vue';
import EmpresaService from '@/api/EmpresaService';
import CategoriaService from '@/api/CategoriaService';
import Empresa from '@/interface/Empresa';
import Categoria from '@/interface/Categoria';
import ModalProps from '@/interface/ModalProps';

const empresaStore = useEmpresaStore();
const empresaService = new EmpresaService();
const categoriaService = new CategoriaService();
const empresas = ref<Empresa[]>([]);
const categorias = ref<Categoria[]>([]);
const categoriaSeleccionada = ref<string | null>(null);
const empresaSeleccionada = ref<Empresa | null>(null);
const textoBusqueda = ref<string>('');
const isOpenToast = ref(false);
const msgToast = ref("");
const props = defineProps<ModalProps>();

onMounted(async () => {
  const dataEmpresas = await empresaService.obtenerEmpresas();
  const dataCategorias = await categoriaService.obtenerCategorias();

  if (dataEmpresas) empresas.value = dataEmpresas;
  if (dataCategorias) categorias.value = dataCategorias;
});

const empresasFiltradas = computed(() => {
  let resultado = empresas.value;

  if (categoriaSeleccionada.value) {
    resultado = resultado.filter( // Filtro por categoría
      (empresa) => empresa.nombre_categoria === categoriaSeleccionada.value
    );
  }
  if (textoBusqueda.value.trim() !== '') {
    const texto = textoBusqueda.value.toLowerCase();
    resultado = resultado.filter((empresa) => // Filtro por búsqueda
      empresa.nombre_empresa.toLowerCase().includes(texto)
    );
  }
  return resultado;
})

const categoriasFiltradas = computed(() => {
  if (!categoriaSeleccionada.value) {
    return categorias.value
  }
  return categorias.value.filter(
    (categoria) => categoria.nombre_categoria === categoriaSeleccionada.value
  )
})

const continuar = () => {
  if (!empresaSeleccionada.value) {
    msgToast.value = "Debe seleccionar una empresa antes de continuar";
    setOpenToast(true);
    return;
  }
  empresaStore.setEmpresa(empresaSeleccionada.value);
  props.nextPage(PayServicePage);
}

const cancelar = () => modalController.dismiss();
const limpiarFiltrado = () => categoriaSeleccionada.value = null;
const seleccionarCategoria = (categoria: string) => categoriaSeleccionada.value = categoria;
const seleccionarEmpresa = (empresa: Empresa) => empresaSeleccionada.value = empresa;
const setOpenToast = (state: boolean) => isOpenToast.value = state;
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
