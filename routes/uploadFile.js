const express = require('express');
const router = express.Router();

router.post("/upload",function(req,res,next){
    console.log(req.body)
    res.send("this is url")
})
module.exports = router;