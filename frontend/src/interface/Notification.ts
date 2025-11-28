export default interface Notification {
    id?: number,
    titulo: string,
    descripcion: string,
    visto?: boolean,
    fecha?: string,
    id_usuario: number,
}