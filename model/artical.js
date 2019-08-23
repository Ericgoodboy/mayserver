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
        else{callback(null, res)}
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
    updateArticals(data,function(err,res){
        if(err){
            console.log(err);
        }else{
            console.log("changeOk")
        }
    });
}


const addArticals = function(arr,callback){
    let sql = "INSERT INTO markdowns (aid,md,render) VALUES (?,?,?);"
    let connection = getConnection()
    connection.query(sql,arr,function(err,res){
        if(err){
            callback(err,null)
        }else(callback(null,res))
        connection.commit()
        connection.end()
    })
}
const deleteArticals = function(aid,callback){
    let sql = "delete from markdowns where aid = ?"
    let connection = getConnection()
    connection.query(sql,[aid],function(err,res){
        if(err){
            callback(err,null)
        }else(callback(null,res))
        connection.commit()
        connection.end()
    })
}
const updateArticals = function(data,callback){
    let sql = "update markdowns set md=?,render= ? where aid = ?"
    let arr= [data.value,data.editorContent,data.id]
    let connection = getConnection()
    connection.query(sql, arr,function(err,res){
        if(err){
            callback(err,null)
        }else(callback(null,res))
        connection.commit()
        connection.end()
    })
    let sql2 = "update atical set title=?,type= ? where aid = ?"
    let arr2 = [data.title,data.d_type,data.id]
    let connection2 = getConnection()
    connection2.query(sql2, arr2,function(err,res){
        if(err){
            console.log(err)
        }else{

        }
        connection2.commit()
        connection2.end()
    })
}
const updateTop=function(aid,top){
    let sql2 = "update atical set toping=? where aid = ?"
    let arr2 = [top,aid]
    let connection2 = getConnection()
    connection2.query(sql2, arr2,function(err,res){
        if(err){
            console.log(err)
        }else{

        }
        connection2.commit()
        connection2.end()
    })
}
const getArticals = function(aid,callback){
    let sql = "select * from markdowns where aid = ?"
    arr= [aid]
    let connection = getConnection()
    connection.query(sql, arr,function(err,res){
        if(err){
            callback(err,null)
        }else(callback(null,res))
        connection.commit()
        connection.end()
    })
}

const insert=function(data) {
    let sql = "INSERT INTO atical (aid,title,author,time,subscrib,type) VALUES (?,?,?,now(),?,?);"
    const dom = new JSDOM(data.editorContent);
    desc = dom.window.document.getElementsByTagName("p")[0]
    // let path = baseDir+data.id+".dat"
    // let path2 = baseDir+data.id+".md"
    // fs.writeFile(path,data.editorContent,()=>{})
    // fs.writeFile(path2,data.value,()=>{})
    arr0= [data.id,data.value,data.editorContent]
    addArticals(arr0,function(err,res){
        if(err){
            console.log(err)
        }else{
            console.log("add to database ok")
        }
    })
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
            getArticals(id,function(err,resf){
                if(err){
                }else{
                   if (resf.length<=0){
                    let data = {
                        id:res[0].aid,
                        title:res[0].title,
                        body:"404",
                        user:res[0].author,
                        saw:res[0].saw,
                        type:res[0].type,
                        value:"# hello mark down"
                    }
                    callback(err,data)
                   }else{
                    let data = {
                        id:res[0].aid,
                        title:res[0].title,
                        body:resf[0].render,
                        user:res[0].author,
                        saw:res[0].saw,
                        type:res[0].type,
                        value:"# hello mark down"
                    }
                    callback(err,data)
                   }
                    
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
            getArticals(id,function(err,resf){
                if(err){
                }else{
                   if (resf.length<=0){
                    let data = {
                        id:res[0].aid,
                        title:res[0].title,
                        body:"404",
                        user:res[0].author,
                        saw:res[0].saw, 
                        type:res[0].type,
                        value:"# hello mark down"
                    }
                    callback(err,data)
                   }else{
                    let data = {
                        id:res[0].aid,
                        title:res[0].title,
                        body:resf[0].render,
                        user:res[0].author,
                        saw:res[0].saw,
                        type:res[0].type,
                        value:resf[0].md,
                    }
                    callback(err,data)
                   }
                    
                }
            })
            }
        }
        connection.end()
    })
}


artical = {getAllArticals,testhas,updateOrInsert,geTopArticals,
    getallinfo,getfulllArtical,geArticalsBytype,updateTop}
module.exports = artical