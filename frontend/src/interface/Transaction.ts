export default interface Transaction {
    id?: number,
    tipo: string,
    detalle: string,
    monto: number,
    metodo_pago: string,
    emisor: string,
    receptor: string,
    saldo_anterior: number,
    nuevo_saldo: number,
    fecha?: string,
    estado: string,
    id_cuenta: number,
}