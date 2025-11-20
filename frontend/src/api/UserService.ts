import UserLogged from "@/interface/UserLogged";
import UserRegister from "@/interface/UserRegister";
import axios from "axios";

axios.defaults.withCredentials = true;

const UserService = {
    async login(user: string, password: string): Promise<boolean> {
        try {
            await axios.post('http://localhost:3000/usuario/login', { user, password });
            return true;
        } catch {
            return false;
        }
    },
    async register(usuario: UserRegister): Promise<string | null> {
        try {
            await axios.post('http://localhost:3000/usuario/register', usuario);
            return null;
        } catch (err: any) {
            const msg = err.response?.data?.message;
            return msg;
        }
    },
    async checkSession(): Promise<boolean> {
        try {
            const resp = await axios.get('http://localhost:3000/usuario/check');
            return resp.status === 200;
        } catch {
            return false;
        }
    },
    async loggedUser(): Promise<UserLogged | null> {
        try {
            const resp = await axios.get('http://localhost:3000/usuario/me');
            return resp.data as UserLogged;
        } catch {
            return null;
        }
    },
    async logout() {
        try {
            await axios.post('http://localhost:3000/usuario/logout');
        } catch (error) { 
            console.log(error);
        }
    }
} 

export default UserService;