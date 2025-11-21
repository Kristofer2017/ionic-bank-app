import Categoria from "./Categoria";

export default interface Empresa {
    id: number,
    nombre: string,
    estado: string,
    categoria: Categoria
} 
