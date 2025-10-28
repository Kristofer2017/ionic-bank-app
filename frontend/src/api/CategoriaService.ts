import Categoria from "@/interface/Categoria"
import axios from "axios";

export default class CategoriaService {
    async obtenerCategorias(): Promise<Categoria[] | null> {
        try {
            const response = await axios.get('http://localhost:3000/categorias/get/all');
            const categorias: Categoria[] = response.data;

            return categorias;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}