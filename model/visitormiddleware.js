const express = require('express');
const router = express.Router();
let getConnection =require('./db')
let Day = (new Date()).getDate()

router.use(function(req,res,next){
    let sql = "INSERT INTO log (lid,time,url,ip) VALUES (?,now(),?,?)"
    let host = req.hostname
    let ip = req.ip
    let url = req.url
    let lid = (new Date()).getTime()
    let connection = getConnection()
    connection.query(sql,[lid,url,ip],function(err,res){
        if(err){
            console.log(`err log :${Day} - ${host} - ${ip} - ${url}`)
        }else{
            console.log(`succes log:${Day} - ${host} - ${ip} - ${url}`)
        }
        connection.close()
    })
    
    next() 
})
module.exports = router;