const userRouter = require('./User')
const productRouter = require('./Product')
const imageRouter = require('./Imgage')

function route(app){
    app.use('/users', userRouter);
    app.use('/products', productRouter)
    app.use('/images', imageRouter)
}

module.exports = route
