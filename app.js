const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')

const pageController = require('./controllers/pageController')

const app = express()

//connect db
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost/fixtures-db').then(() => {
    console.log('DB Connection Successful')
}).catch((err) => {
    console.log(err)
})

process.on('warning', (warning) => {
    console.log(warning.stack);
})



//template engine
app.set("view engine","ejs")


app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'views/index.html'))
// })
// app.get('/', (req, res) => {
//     res.render('index')
// })

app.get('/', pageController.getIndexPage) //home
app.get('/about', pageController.getAboutPage) //about
app.get('/furnitures', pageController.getFurnituresPage) //furnitures
app.get('/blog', pageController.getBlogPage) //blog
app.get('/contact', pageController.getContactPage) //contact







const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})