import Transaction from "@/interface/Transaction";
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

const TransactionService = {
    async obtenerTransac(id_cuenta: number): Promise<Transaction[]> {
        try {
            const response = await axios.get(`http://localhost:3000/transaction/get/${id_cuenta}`);
            return response.data as Transaction[];
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    async nuevaTransac(transaccion: Transaction): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/transaction/add', transaccion);          
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default TransactionService;