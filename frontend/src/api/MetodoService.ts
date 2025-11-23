import MetodoPago from "@/interface/MetodoPago";
import MetodoRegister from "@/interface/MetodoRegister";
import axios from "axios";

const MetodoService = {
    async obtenerMetodos(id_usurio: number): Promise<MetodoPago[]> {
        try {
            const response = await axios.get(`http://localhost:3000/metodos/usuario/${id_usurio}`);
            return response.data as MetodoPago[];
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    async agregarMetodo(metodo: MetodoRegister): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/metodos/add', metodo);          
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async elminarMetodo(idMetodo: number): Promise<boolean>{
        try {
            await axios.delete(`http://localhost:3000/metodos/eliminar/${idMetodo}`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async actualizarMetodo(metodo: MetodoPago): Promise<boolean>{
        try {
            await axios.put(`http://localhost:3000/metodos/actualizar`, metodo);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default MetodoService;