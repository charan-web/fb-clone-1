const {createPxoxyMiddleware} = require('http-proxy-middleware')
module.exports=app=>{
     app.use(
        createPxoxyMiddleware('post/timeline/:id',{
            target:'https://fb-clone-backend-1.herokuapp.com/api/',
            changeOrigin:true
        })
    )
  
   
}