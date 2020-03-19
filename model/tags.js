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
const addTags =function(tag,callback){
    // 插入标签并返回标签
    let sql = 'select id from tags where value = ?'
    let connection = getConnection();
    connection.query(sql,[tag],function(err,res,fields){
        if(err){callback(err,null)}
        else if(res.length>0){
            callback(null,res[0].id)
        }else{
            let sql2 = 'insert into tags(value) values(?)';
            connection.query(sql2,[tag],function(err,res,fields){
                if(err){callback(err,null)}
                else{callback(res.insertId)}
            })
        }
    })
}
module.exports = {
    getAllTags,getAllTagsInfo,addTags
}