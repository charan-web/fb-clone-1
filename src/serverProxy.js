const {createPxoxyMiddleware} = require('http-proxy-middleware')
module.exports=app=>{
    app.use(
        createPxoxyMiddleware('user/friends/:id',{
            target:'https://fb-clone-backend-1.herokuapp.com/api/',
            changeOrigin:true
        })
    )
    app.use(
        createPxoxyMiddleware('/',{
            target:'https://react-chat-app-by-me.herokuapp.com',
            changeOrigin:true
        })
    )
}