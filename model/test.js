const artical = require('./artical')
const getConnection = require("./db")
const tags = require("./tags")
// artical.getAllArticals(function(err,res){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(res)
//     }
// })
// artical.testhas(123,function(err,res){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(res)
//     }
// })
// let sql = 'insert into tags(value) values("test")'
// let connection = getConnection();
// connection.query(sql,function(err,res,fields){
//     if(err){
//         console.log("filed",err)
//     }else{
//         console.log("sucess")
//         console.log(res)
//     }
// })
tags.addTags("test3",function(err,res){
    //
    if(err){
        console.log(err)
    }else{
        console.log(res)
    }
})
