
const express = require('express');
const router = express.Router();
const artical = require("../model/artical")
// const parser = require('html-dom-parser');
/* GET home page. */

router.post('/login', function(req, res, next) {
  data={
      status:1,
      data:[],
      success:true
  }
 
  res.send(data)
});

router.post('/editor/save', function(req, res, next) {
  data={
      status:1,
      data:[],
      msg:""
  }
  artical.updateOrInsert(req.body)
  res.send(data)
});
router.post('/editor/getCode', function(req, res, next) {
  data={
    status:1,
    data:[],
    code:"",
    msg:""
}
  let d = new Date()
  data.code=d.getTime()
  res.send(data)
});
router.get("/get/items",function(req,res,next){
  console.log("sdas")
  artical.getAllArticals(function(err,result){
    if(err){
      // console.error("err")
    }else{
      // console.log(result)
      if(result){
        let resdata = []
      for(let i=0;i<result.length;i++){
        let t = result[i].time;
        t = (t.getYear()+1900)+"-"+t.getMonth()+"-"+t.getDay()
        let data = {
          title:result[i].title,
          publishDate:t,
          desc:result[i].subscrib,
          user:result[i].author,
          id:result[i].aid,
          type:result[i].type
        }
        console.log(result[i].time instanceof Date)
        resdata.push(data)
      }
      res.send(resdata)
      }
    }
  })
})
router.get("/get/hotarticals",function(req,res,next){
  artical.getAllArticals(function(err,result){
    if(err){
      console.error(err)
    }else{
      // console.log(result)
      if(result){
        let resdata = []
      for(let i=0;i<result.length;i++){
        let t = result[i].time;
        t = (t.getYear()+1900)+"-"+t.getMonth()+"-"+t.getDay()
        let data = {
          title:result[i].title,
          publishDate:t,
          desc:result[i].subscrib,
          user:result[i].author,
          url:"/iji",
          id:result[i].aid
        }
        console.log(result[i].time instanceof Date)
        resdata.push(data)
      }
      res.send(resdata)
      }
    }
  })
})
router.get("/get/toping",function(req,res,next){
  artical.geTopArticals(function(err,result){
    if(err){
      console.error(err)
    }else{
      // console.log(result)
      if(result){
        let resdata = []
      for(let i=0;i<result.length;i++){
        let t = result[i].time;
        t = (t.getYear()+1900)+"-"+t.getMonth()+"-"+t.getDay()
        let data = {
          title:result[i].title,
          publishDate:t,
          desc:result[i].subscrib,
          user:result[i].author,
          aid:result[i].aid
        }
        resdata.push(data)
      }
      res.send(resdata)
      }
    }
  })
})
router.post("/get/fullartical",function(req,res,next){
  artical.getfulllArtical(req.body.id,function(err,resf){
    if(err){
      
    }else{
      res.send(resf)
    }
  })
})
router.post("/editor/getInit",function(req,res,next){
  artical.getallinfo(req.body.id,function(err,resf){
    if(err){
    }else{
      res.send(resf)
    }
  })
})
router.post("/get/sub-body",function(req,res,next){
  artical.geArticalsBytype(req.body,function(err,result){
    if(err){
      console.error(err)
    }else{
      // console.log(result)
      if(result){
        let resdata = []
      for(let i=0;i<result.length;i++){
        let t = result[i].time;
        t = (t.getYear()+1900)+"-"+t.getMonth()+"-"+t.getDay()
        let data = {
          title:result[i].title,
          publishDate:t,
          desc:result[i].subscrib,
          user:result[i].author,
          id:result[i].aid,
          type:result[i].type

        }
        resdata.push(data)
      }
      res.send(resdata)
      }
    }
  })
})
router.get("/totop",function(req,res,next){
  
  // console.log(req.params)
  console.log(req.query.aid)
  artical.updateTop(req.query.aid,1)
  res.send("ok")
})
module.exports = router;
