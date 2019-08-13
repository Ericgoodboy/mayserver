var mysql      = require('mysql');


// connection.connect();
let getConnection =function(){
  let connection = mysql.createConnection({
    host     : '114.116.106.193',
    user     : 'root',
    password : 'lj2p1sh.',
    database : 'mayblog'
  });
  connection.connect()
  return connection
}
module.exports = getConnection