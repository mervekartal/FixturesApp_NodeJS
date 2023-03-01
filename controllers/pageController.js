const Category = require("../models/Category")
const Furniture = require("../models/Furniture")

exports.getIndexPage = (req,res) => {
    res.status(200).render('index',{
        page_name: "index"
    })
}
exports.getAboutPage = (req,res) => {
    res.status(200).render('about',{
        page_name: "about"
    })
}
exports.getCategoriesPage = async (req,res) => {
    //const categories = await Category.find().sort('-createdAt')
    const page = req.query.page || 1 //request'ten gelen sayfa numarası, yoksa sayfa
    const categoriesPerPage = 2  //1 sayfada gösterilecek foto sayısı
    const totalCategory = await Category.find().countDocuments() //toplam foto sayısı

    //sayfa geçişi
    const categories = await Category.find({}).sort('-dateCreated')
    .skip((page-1) * categoriesPerPage)
    .limit(4)
    res.status(200).render('categories', {
      page_name: "categories",
      categories, 
      current: page,
      pages: Math.ceil(totalCategory / categoriesPerPage)
    })
    // res.status(200).render('categories',{
    //     page_name: "categories",
    //     categories
    // })
}
exports.getFurnituresPage = async (req,res) => {
    // const furnitures = await Furniture.find().sort('-createdAt')
    res.status(200).render('furnitures',{
        page_name: "furnitures"
    })
}
exports.getBlogPage = (req,res) => {
    res.status(200).render('blog',{
        page_name: "blog"
    })
}
exports.getContactPage = (req,res) => {
    res.status(200).render('contact',{
        page_name: "contact"
    })
}
