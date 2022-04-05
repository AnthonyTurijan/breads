//DEPENDENCIES
const mongoose = require('mongoose')
const express = require('express')
const { append } = require('vary')
const methodOverride = require('method-override')

//CONFIG
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>{
        console.log('connected to mondo', process.env.MONGO_URI)
    })

//MIDDLEWARE
app.set('views', __dirname + '/views')
app.use(methodOverride('_method'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


//ROUTES
app.get('/', (req,res) =>{
    res.send('Welcome to an Awesome App about Breads!')
})

//BREADS
const breadsController = require('./controllers/bread_controllers.js')
app.use('/breads', breadsController)

//BAKERS
const bakersControllers = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersControllers)

//LISTEN
app.listen(PORT, () =>{
    console.log('Server On')
})

//404 Page
app.get('*', (req,res) => {
    res.send('404')
})