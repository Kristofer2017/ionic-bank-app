import Empresa from "@/interface/Empresa";
import Categoria from "@/interface/Categoria"
import Servicio from "@/interface/Servicio";
import axios from "axios";

const EmpresaService = {
    async obtenerEmpresas(): Promise<Empresa[]> {
        try {
            const response = await axios.get('http://localhost:3000/empresas/get/all');
            return response.data as Empresa[];
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    async obtenerCategorias(): Promise<Categoria[]> {
        try {
            const response = await axios.get('http://localhost:3000/categorias/get/all');
            return response.data as Categoria[];
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    async obtenerServicios(idEmpresa: number): Promise<Servicio[] | null> {
        try {
            const response = await axios.get(`http://localhost:3000/servicios/get/${idEmpresa}`);
            const servicios: Servicio[] = response.data;

            return servicios;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default EmpresaService;