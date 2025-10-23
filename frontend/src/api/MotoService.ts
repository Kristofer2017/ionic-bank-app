import { Moto } from "@/interface/Moto"
import axios from "axios"

export default class MotoService {
    async registrarMoto(moto: Moto): Promise<Moto | null> {
        try {
            const response = await axios.post('http://localhost:3000/add/moto', moto);
            const newMoto: Moto = response.data

            if (newMoto) {
                return newMoto
            } else {
                throw "Error al registrar la moto"
            }
        } catch (error) {
            console.error("Error en el registro:", error)
            return null
        }
    }

    async getMotos(): Promise<Moto[] | null> {
        try {
            const response = await axios.get('http://localhost:3000/get/motos')
            const motos: Moto[] = response.data
            return motos
        } catch (error) {
            return null
        }

    }

    async eliminarMoto(modelo: string) {
        try {
            const response = await axios.delete(`http://localhost:3000/delete/moto/${modelo}`);
            return response.data;
        } catch (error: any) {
            console.error("Error al eliminar moto:", error);
            throw error;
        }
    }
} 
