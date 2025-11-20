import UserLogged from '@/interface/UserLogged';
import { defineStore } from 'pinia';

export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        usuarioAutenticado: null as UserLogged | null,
    }),
    actions: {
        setUsuario(usuario: UserLogged){ this.usuarioAutenticado = usuario },
        clearUsuario() { this.usuarioAutenticado = null },
    }
})