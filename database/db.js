const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Fatma.1997",
    database: "postgres"
})

client
.connect()
.then(() => console.log("Database connected"))
.catch((err) => console.error("Connection error", err.stack));

module.exports = client;