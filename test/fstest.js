const fs = require("fs")

fs.writeFile("a.txt","osadmksadl",function(err){
    if(err){
        console.log(err)
    }else{
        console.log("ok")
    }

})