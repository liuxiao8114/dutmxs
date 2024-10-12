const mysql = require('mysql')

module.exports = function() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'x',
    password: 'y',
    database: 'world',
  })

  connection.connect()

  connection.query('seelct * from city', (err, results, fields) => {
    if(err)
      throw err
    
    console.log(results[0].solution)
    console.log(results[1].solution)
    console.log(results[2].solution)
  })

  connection.end()
}
