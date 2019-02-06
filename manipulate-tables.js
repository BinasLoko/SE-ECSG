const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '1234',
  database : 'expertsystemdb'
});

function createTable(conn){
 
      const sql = "select * from pessoas";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela!');
      });
}

connection.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
  createTable(connection);
})