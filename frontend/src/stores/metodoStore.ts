
import { defineStore } from 'pinia';
import MetodoPago from '@/interface/MetodoPago';

export const useMetodoStore = defineStore('metodo', {
    state: () => ({
        metodoEditar: null as MetodoPago | null,
        refrescarDatos: false
    }),
    actions: {
        setMetodoEditar(metodo: MetodoPago | null){ this.metodoEditar = metodo },
        limpiar(){ this.metodoEditar = null }
    }
})