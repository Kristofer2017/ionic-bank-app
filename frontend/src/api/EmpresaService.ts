import Empresa from "@/interface/Empresa";
import Categoria from "@/interface/Categoria"
import Servicio from "@/interface/Servicio";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

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
    async obtenerServicios(idEmpresa: number): Promise<Servicio[]> {
        try {
            const response = await axios.get(`http://localhost:3000/servicios/get/${idEmpresa}`);
            return response.data as Servicio[];
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default EmpresaService;