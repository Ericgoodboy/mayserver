let getConnection =require('./db')
const getAllTags=function(callback) {
    let sql = 'select * from tags'
    // console.log(connection.state)
    let connection = getConnection()
    connection.query(sql, function (err, res, fields) {
        if (err) { callback(err, null) }
        else{callback(null, res)}
        connection.end()
    })
}
const getAllTagsInfo=function(callback) {
    let sql = 'select * from v_tag_infos'
    // console.log(connection.state)
    let connection = getConnection()
    connection.query(sql, function (err, res, fields) {
        if (err) { callback(err, null) }
        else{callback(null, res)}
        connection.end()
    })
}
module.exports = {
    getAllTags,getAllTagsInfo
}