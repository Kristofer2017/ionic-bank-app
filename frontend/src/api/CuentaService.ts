import User from "@/interface/User";
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

const CuentaService = {
    async recargar(id_cuenta: number, monto: number): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/cuenta/recargar', { id_cuenta, monto });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async debitar(id_cuenta: number, monto: number): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/cuenta/debitar', { id_cuenta, monto });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async transferir(id_cuenta_origen: number, id_cuenta_destino: number, monto: number): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/cuenta/transferir', { id_cuenta_origen, id_cuenta_destino, monto });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async buscar(numero_cuenta: string): Promise<User | null> {
        try {
            const resp = await axios.post('http://localhost:3000/cuenta/buscar', {numero_cuenta});
            return resp.data as User;
        } catch (error) {
            return null;
        }
    },
} 

export default CuentaService;