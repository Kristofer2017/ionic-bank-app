const { pool } = require("../database/MySQLConexion")
const restaurantesQuery = require("../querys/RestaurantesQuery")

module.exports = {
    async insertar(restaurante) {
        const [
            result
        ] = await pool.execute(
            restaurantesQuery.insertar(
                restaurante
            )
        );
        return result.insertId;
    }
}