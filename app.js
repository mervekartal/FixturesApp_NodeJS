const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const pageController = require('./controllers/pageController')
const categoryController = require('./controllers/categoryController')
const furnitureController = require('./controllers/furnitureController')

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
app.use(methodOverride('_method',{
    methods: ['POST','GET'],
}))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'views/index.html'))
// })
// app.get('/', (req, res) => {
//     res.render('index')
// })

app.get('/', pageController.getIndexPage) //home
app.get('/about', pageController.getAboutPage) //about
// app.get('/categories', pageController.getCategoriesPage) //categories
// app.get('/furnitures', pageController.getFurnituresPage) //furnitures
app.get('/contact', pageController.getContactPage) //contact


app.post('/categories', categoryController.createCategory)
app.get('/categories', categoryController.getAllCategories)

app.get('/furnitures', furnitureController.getAllFurnitures)
app.post('/furnitures', furnitureController.createFurniture)
app.get('/furnitures/:slug', furnitureController.getFurniture)




const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})