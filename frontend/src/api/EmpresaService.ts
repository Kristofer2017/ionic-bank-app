import Empresa from "@/interface/Empresa"
import axios from "axios";

export default class EmpresaService {
    async obtenerEmpresas(): Promise<Empresa[] | null> {
        try {
            const response = await axios.get('http://localhost:3000/empresas/get/all');
            const empresas: Empresa[] = response.data;

            return empresas;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}