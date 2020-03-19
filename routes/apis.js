const express = require('express');
const router = express.Router();
const artical = require("../model/artical")
const tags = require("../model/tags")
const confg = require("../blog.config")
// const parser = require('html-dom-parser');
/* GET home page. */



// 登录模拟逻辑
router.post('/login', function(req, res, next) {
  data={
      status:1,
      data:[],
      success:true
  }
  req.session["login"] = true
  res.send(data)
});


//保存的编辑
router.post('/editor/save', function(req, res, next) {
  data={
      status:1,
      data:[],
      msg:""
  }
  if(req.session["login"]){
    artical.updateOrInsert(req.body)
    res.send(data)
  }else{
    res.send(data)
  }
  res.send(data)
});

// 获取一个唯一的编码作为文章的名字
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



// 获取所有项目
router.get("/get/items",function(req,res,next){
  // console.log("sdas")
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
        // console.log(result[i].time instanceof Date)
        resdata.push(data)
      }
      res.send(resdata)
      }
    }
  })
})



// 获取热点文章
router.get("/get/hotarticals",function(req,res,next){
  artical.getHotAllArticals(function(err,result){
    if(err){
      console.error(err)
    }else{
      // console.log(result)
      if(result){
        let resdata = []
      for(let i=0;i<result.length;i++){
        let t = result[i].time;
        t = (t.getYear()+1900)+"-"+(t.getMonth()+1)+"-"+t.getDate()
        let data = {
          title:result[i].title,
          publishDate:t,
          desc:result[i].subscrib,
          user:result[i].author,
          // url:"/iji",
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



// 获取置顶文章
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

//获取完整文章信息
router.post("/get/fullartical",function(req,res,next){
  artical.getfulllArtical(req.body.id,function(err,resf){
    if(err){
      
    }else{
      res.send(resf)
    }
  })
})


// 获取一个文章的完整信息
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

//置顶
router.get("/totop",function(req,res,next){
  // console.log(req.params)
  console.log(req.query.aid)
  artical.updateTop(req.query.aid,1)
  res.send("ok")
})

//取消置顶
router.get("/backtop",function(req,res,next){
  // console.log(req.params)
  console.log(req.query.aid)
  artical.updateTop(req.query.aid,0)
  res.send("ok")
})

//获取target映射
router.post("/get/tags",function(req,res,next){
  tags.getAllTags(function(err,result){
    if(err){
      res.send({})
    }else{
      let data = {}
      
      for(let i=0;i<result.length;i++){
        data[result[i].id] = result[i].value
      }
      console.log(data[1])
      res.send(data)
    }
  })
})


//用于统计每一个tags的文章的数量
router.post("/get/tagsinfo",function(req,res,next){
  tags.getAllTagsInfo(function(err,result){
    if(err){
      res.send({})
    }else{
      let data = []
      for(let i=0;i<result.length;i++){
        temp = {
          tid:result[i].tid,
          title:result[i].title,
          c :result[i].c
        }
        data.push(temp)
      }
      // console.log(data)
      res.send(data)
    }
  })
})
router.get("/add/tag",function(req,res,next){
  let tag = req.query.tag
  console.log("ds "+tag)
  tags.addTags(tag,function(err,rest){
    if(err){
      res.send({
        status:-1
      })
    }else{
      res.send({
        status:1,
        tagsId:rest
      })
    }
  })
})


module.exports = router;
