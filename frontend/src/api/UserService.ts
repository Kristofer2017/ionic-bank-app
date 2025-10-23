import { User } from "@/interface/User"
import axios from "axios"

export default class UserService {
    async login(username: string, password: string): Promise<User | null> {
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });
            const user: User = response.data

            if (user) {
                return user
            } else {
                throw "Usuario no encontrado"
            }
        } catch (error) {
            console.error("Error en login: ", error)
            return null
        }
    }

    async getUser(): Promise<string | null> {
        try {
            const response = await axios.post('http://localhost:3000/get/user');
            const username: string | null = response.data

            if (username) {
                return username
            } else {
                throw "Usuario no encontrado"
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
} 
