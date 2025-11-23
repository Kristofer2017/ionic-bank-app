import Account from "./Account";

export default interface UserLogged {
    id: number,
    nombre: string,
    telefono: string,
    email: string,
    dui: string,
    user: string,
    cuenta: Account
} 
