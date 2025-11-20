import Categoria from "./Categoria";

export default interface Empresa {
    id: number,
    empresa: string,
    estado: string,
    categoria: Categoria
} 
