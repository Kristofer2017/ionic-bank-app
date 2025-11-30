import Notification from "@/interface/Notification";
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

const NotificationService = {
    async obtenerNotificaciones(id_usuario: number): Promise<Notification[]> {
        try {
            const response = await axios.get(`http://localhost:3000/notificacion/get/${id_usuario}`);
            return response.data as Notification[];
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    async nuevaNotificacion(notificacion: Notification): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/notificacion/add', notificacion);          
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async marcarUnaVisto(id_notificacion: number, visto: boolean): Promise<boolean> {
        try {
            await axios.patch('http://localhost:3000/notificacion/actualizar-una', { id_notificacion, visto });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async marcarTodasVisto(id_usuario: number): Promise<boolean> {
        try {
            await axios.patch('http://localhost:3000/notificacion/actualizar-todas', { id_usuario, visto: true });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
}

export default NotificationService;