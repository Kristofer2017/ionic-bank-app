import Empresa from '@/interface/Empresa';
import { defineStore } from 'pinia';

export const useEmpresaStore = defineStore('empresa', {
    state: () => ({
        empresaSeleccionada: null as Empresa | null,
    }),
    actions: {
        setEmpresa(empresa: Empresa){
            this.empresaSeleccionada = empresa;
        },
        limpiar() {
            this.empresaSeleccionada = null;
        }
    }
})