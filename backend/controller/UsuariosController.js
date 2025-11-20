import pool from "../database/MySQLConexion.js";
import query from '../queries/UsuariosQuery.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default {
    async insertarUsuario(usuario) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
        usuario.password = hashedPassword;
        try {
            const { sql, params } = query.insertar(usuario);
            const [usuario_result] = await pool.execute(sql, params);
            
            this.crearCuentaUsuario(usuario_result.insertId);
            
            return { message: "Usuario y Cuenta creados exitosamente." };
        } catch (error) {
            console.log(error);
            
            if (error.code === "ER_DUP_ENTRY"){
                const msg = error.message;

                if(msg.includes('email')) throw new Error("El correo ya ha sido registrado anteriormente.");
                if(msg.includes('dui')) throw new Error("El número de DUI ya fue registrado antes.");
                if(msg.includes('user')) throw new Error("El usuario ingresado ya existe.");
            }
            throw new Error("Ha ocurrido un error, por favor intentarlo más tarde.");            
        }        
    },

    async crearCuentaUsuario(id){
        let nuevaCuenta = {
            cuenta: this.generarNumeroCuenta(),
            tipo: 'Ahorro',
            id_usuario: id
        }

        const { sql, params } = query.insertarCuenta(nuevaCuenta);
        await pool.execute(sql, params);
    },

    generarNumeroCuenta() {
        const buffer = crypto.randomBytes(6);
        const numero = BigInt('0x' + buffer.toString('hex')).toString().padStart(10, '0');
        return numero.slice(-10);
    },

    async login(user, password){
        const sql = query.obtenerByUsuario(user);
        const [ result ] = await pool.execute(sql);

        if (result.length === 0) {
            throw new Error("Credenciales incorrectas");
        }
        const usuarioEncontrado = result[0];
        const passwordCoincide = await bcrypt.compare(password, usuarioEncontrado.password);

        if (!passwordCoincide) {
            throw new Error("Credenciales incorrectas");
        }

        delete usuarioEncontrado.password;

        const jwtToken = jwt.sign(usuarioEncontrado, process.env.JWT_KEY, { expiresIn: '1h' });
        return { token: jwtToken };
    },

    async obtenerCuenta(idUsuario) {
        const sql = query.obtenerCuenta(idUsuario);
        const [ result ] = await pool.execute(sql);
        return result[0];
    }
}