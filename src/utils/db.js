import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: "localhost",
    user: "usuario_2824003",
    password: "Aprendiz2024",
    database: "node_2824003",
})

export default connection;