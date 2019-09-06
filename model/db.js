var mysql      = require('mysql');
const config = require("../blog.config.js")

// connection.connect();
let getConnection =function(){
  let connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });
  connection.connect()
  return connection
}
module.exports = getConnection