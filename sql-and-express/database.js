const { Pool } = require('pg')
const connectionString = 'jdbc:postgresql://localhost:5432/postgres'
const pool = new Pool({
    connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})