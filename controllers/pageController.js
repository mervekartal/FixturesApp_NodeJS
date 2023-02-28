const Category = require("../models/Category")

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
exports.getFurnituresPage = async (req,res) => {
    const categories = await Category.find().sort('-createdAt')
    res.status(200).render('furnitures',{
        page_name: "furnitures",
        categories
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
