const express = require('express')
const path = require('path')
const ejs = require('ejs')

const pageController = require('./controllers/pageController')

const app = express()




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