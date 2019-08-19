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
const geArticalsBytype=function(data,callback) {
    let sql = 'select * from atical where type = ?'
    // console.log(connection.state)
    let connection = getConnection()
    connection.query(sql,[data.type], function (err, res, fields) {
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
    let path = baseDir+data.id+".dat"
    let path2 = baseDir+data.id+".md"
    fs.writeFile(path,data.editorContent,()=>{
        console.log("html updated")
    })
    fs.writeFile(path2,data.value,()=>{
        console.log("markdown updated")
    })
}
const insert=function(data) {
    let sql = "INSERT INTO atical (aid,title,author,time,subscrib,type) VALUES (?,?,?,now(),?,?);"
    const dom = new JSDOM(data.editorContent);
    desc = dom.window.document.getElementsByTagName("p")[0]
    let path = baseDir+data.id+".dat"
    let path2 = baseDir+data.id+".md"
    fs.writeFile(path,data.editorContent,()=>{})
    fs.writeFile(path2,data.value,()=>{})

    arr = [data.id,data.title,"mayeye","预览正在开发...",data.d_type]
    let connection = getConnection()
    connection.query(sql,arr,function(err,res){
        if(err){
            console.log(err)
        }else(console.log(res))
        connection.commit()
        connection.end()
    })
}
const getfulllArtical=function(id,callback){
    let sql = 'select * from atical where aid = ?'
    let connection = getConnection()
    connection.query(sql, [id],function (err, res, fields) {
        if (err) { callback(err, null) }
        else{
            if(res.length>0){
            let path = baseDir+res[0].aid+".dat"
            fs.readFile(path,function(err,resf){
                    if(err){
                    }else{
                        // console.dir(String(resf))
                        let data = {
                            id:res[0].aid,
                            title:res[0].title,
                            body:String(resf),
                            user:res[0].author,
                            saw:res[0].saw,
                            type:res[0].type,
                            value:"# hello mark down"
                        }
                        
                        callback(err,data)
                    }
            })
            }
        }
        connection.end()
    })
}
const getallinfo=function(id,callback){
    let sql = 'select * from atical where aid = ?'
    let connection = getConnection()
    connection.query(sql, [id],function (err, res, fields) {
        if (err) { callback(err, null) }
        else{
            if(res.length>0){
            let path = baseDir+res[0].aid+".dat"
            fs.readFile(path,function(err,resf){
                    if(err){
                    }else{
                        // console.dir(String(resf))
                        md = "# hello md"
                        try {
                            md = String(fs.readFileSync(baseDir+res[0].aid+".md"))
                        } catch (error) {
                            
                        }
                        console.log(md)
                        let data = {
                            id:res[0].aid,
                            title:res[0].title,
                            body:String(resf),
                            user:res[0].author,
                            saw:res[0].saw,
                            value:md,
                            type:res[0].type,
                            
                        }
                        
                        callback(err,data)
                    }
            })
            }
        }
        connection.end()
    })
}


artical = {getAllArticals,testhas,updateOrInsert,geTopArticals,
    getallinfo,getfulllArtical,geArticalsBytype}
module.exports = artical