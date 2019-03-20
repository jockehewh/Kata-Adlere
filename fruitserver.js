const KOA = require('koa')
const fs = require('fs')
const fruitServer = new KOA();

fruitServer.use(async (ctx, next)=>{
  if(ctx.url === '/favicon.ico') return
  if(ctx.url === '/'){
    ctx.type = 'html'
    ctx.body = fs.createReadStream('./front/index.html')
  }
  if(ctx.url === '/getfruits'){
    ctx.type = 'application/json'
    ctx.body = fs.createReadStream('./listeDeFruits')
  }
  if(/\.js/.test(ctx.url)){
    ctx.type = 'application/javascript'
    ctx.body = fs.createReadStream('./front' + ctx.url)
  }
  if(/\.jpg/.test(ctx.url)){
    ctx.body = fs.createReadStream('./front/imgs' + ctx.url)
  }
})

fruitServer.listen(2019)