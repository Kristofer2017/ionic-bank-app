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
} 

export default CuentaService;