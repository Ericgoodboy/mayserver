const express = require('express');
const router = express.Router();

router.post("/upload",function(req,res,next){
    console.log(req.body)
    var imgurl = "/img/"+(new Date).getTime()
    res.send("")
})
module.exports = router;