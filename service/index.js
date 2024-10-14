const mysql = require('mysql2/promise')

async function testDb() {
  const connection = await mysql.createConnection({
    host: '192.168.64.1',
    user: '',
    password: '',
    database: 'world',
  })

  try {
    const [ results, fields ] = await connection.query(
      `select * from city`
    )

    console.log(results)
  } catch(err) {
    console.log(err)
  }
}

function createPool() {
  return mysql.createProol({
    host: 'localhost'
  })
}

module.exports = {
  testDb,
  createPool
}
