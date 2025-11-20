import Empresa from '@/interface/Empresa';
import Categoria from '@/interface/Categoria';
import { defineStore } from 'pinia';

export const useEmpresaStore = defineStore('empresa', {
    state: () => ({
        empresaSeleccionada: null as Empresa | null,
        empresas: [] as Empresa[],
        categorias: [] as Categoria[],
    }),
    actions: {
        setEmpresaSelec(empresa: Empresa){ this.empresaSeleccionada = empresa },
        setListaEmpresas(empresas: Empresa[]){ this.empresas = empresas },
        setCategorias(categorias: Categoria[]){ this.categorias = categorias },
        
        // Borrar datos
        clearEmpresaSelec(){ this.empresaSeleccionada = null },
        clearListaEmpresas(){ this.empresas = [] },
        clearCategorias(){ this.categorias = [] },
    }
})