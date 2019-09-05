const express = require('express');
const router = express.Router();

var multer = require("multer");

var storage = multer.diskStorage({

    //将上传的文件存储在指定的位置（不存在的话需要手动创建）
    destination: function (req, file, cb) {
        console.log("------------")
        cb(null, './img')
    },
    //将上传的文件做名称的更改
    filename: function (req, file, cb) {
        let arr= file.originalname.split(".")
        let prefix = arr[arr.length-1]
        let fullname = Date.now() + "-" + "markdown."+prefix
        cb(null, Date.now() + "-" + file.originalname.split("."))
    }
})
//创建multer对象
var upload = multer({ storage: storage })

//指定当前字段可以携带多个文件
// var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }])

router.post("/upload", upload.single('image'),function (req, res, next) {
    console.log(req.file)
    res.send("/img/"+req.file.filename)
})
module.exports = router;