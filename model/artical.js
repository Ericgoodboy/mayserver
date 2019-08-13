let getConnection =require('./db')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const baseDir = "./articals/"
// const dom = new JSDOM(`<p>Hello world</p><p>hello</p>`);
// console.log(dom.window.document.getElementsByTagName("p")[0].innerHTML);
const fs = require("fs")
const getAllArticals=function(callback) {
    let sql = 'select * from atical'
    // console.log(connection.state)
    let connection = getConnection()
    connection.query(sql, function (err, res, fields) {
        if (err) { callback(err, null) }
        callback(null, res)
        connection.end()
    })
}
const geTopArticals=function(callback) {
    let sql = 'select * from atical where toping = 1'
    // console.log(connection.state)
    let connection = getConnection()
    connection.query(sql, function (err, res, fields) {
        if (err) { callback(err, null) }
        callback(null, res)
        connection.end()
    })
}
const testhas = function(aid,callback){
    let sql = 'select count(*) as c from atical where aid = ?'
    // console.log(connection.state)
    // if (connection.state=="disconnected"){
    //     connection.connect()
    // }
    let connection = getConnection()
    connection.query(sql, [aid],function (err, res, fields) {
        if (err) { callback(err, null) }
        else{
            if(res[0].c >0){
                callback(null,true)
            }else{
                callback(null,false)
            }
        }
        connection.end()
    })
}

const updateOrInsert=function(data) {
    testhas(data.id,function(err,has){
        if(has){
            update(data)
        }else{
            console.log("insert")
            insert(data)
        }
    })
}
const update=function(data) {
}
const insert=function(data) {
    let sql = "INSERT INTO atical (aid,title,author,time,subscrib) VALUES (?,?,?,now(),?);"
    const dom = new JSDOM(data.editorContent);
    desc = dom.window.document.firstElementChild.innerHTML
    let path = baseDir+data.id+".dat"
    fs.writeFile(path,data.editorContent,()=>{})
    arr = [data.id,data.title,"mayeye",desc]
    let connection = getConnection()
    
    connection.query(sql,arr,function(err,res){
        if(err){
            console.log(err)
        }else(console.log(res))
        connection.commit()
        console.log("commit")
        connection.end()
    })
}


artical = {getAllArticals,testhas,updateOrInsert,geTopArticals}
module.exports = artical