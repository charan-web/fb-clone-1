const {createPxoxyMiddleware} = require('http-proxy-middleware')
module.exports=app=>{
    app.use(
        createPxoxyMiddleware('user/friends/:id',{
            target:'https://fb-clone-backend-1.herokuapp.com/api/',
            changeOrigin:true
        })
    )
    app.use(
        createPxoxyMiddleware('post/timelinge/:id',{
            target:'https://fb-clone-backend-1.herokuapp.com/api/',
            changeOrigin:true
        })
    )
}