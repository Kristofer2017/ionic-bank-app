module.exports = { 
    insertar(pasatiempo) { 
        var sql = `INSERT INTO pasatiempos (activo, nombre) VALUES ('${pasatiempo.activo}', '${pasatiempo.nombre}')`; 
        return sql; 
    }, 
 
    obtenerTodos() { 
        var sql = `SELECT * FROM pasatiempos WHERE activo = 'Y' ORDER BY nombre ASC`; 
        return sql; 
    }, 
 
    eliminarById(idPasatiempo) { 
        var sql = `DELETE FROM pasatiempos WHERE id = ${idPasatiempo}`; 
        return sql; 
    } 
} 