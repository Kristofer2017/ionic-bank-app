module.exports = { 
    insertar(departamento) { 
        var sql = `INSERT INTO departamentos (activo,  nombre) VALUES ('${departamento.activo}', '${departamento.nombre}')`;
        return sql; 
    }, 
 
    obtenerTodos() { 
        var sql = `SELECT * FROM departamentos WHERE activo = 'Y' ORDER BY nombre ASC`; 
        return sql; 
    }, 
 
    eliminarById(idDepartamento) { 
        var sql = `DELETE FROM departamentos WHERE id = ${idDepartamento}`; 
        return sql; 
    } 
} 