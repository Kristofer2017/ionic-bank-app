import { User } from "@/interface/User"
import axios from "axios"

export default class UserService {
    async login(user: string, password: string): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/usuario/login', { user, password }, { withCredentials: true });
            return true;
        } catch {
            return false;
        }
    }

    async register(usuario: User): Promise<string | null> {
        try {
            await axios.post('http://localhost:3000/usuario/register', usuario);
            return null;
        } catch (err: any) {
            const msg = err.response?.data?.message;
            return msg;
        }
    }
} 
