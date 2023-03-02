const Category = require('../models/Category')

exports.createCategory = async (req,res) => {
    try{
    const category = await Category.create(req.body)
        res.status(201).redirect('categories')
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.getAllCategories = async (req,res) => {
    const page = req.query.page || 1 //request'ten gelen sayfa numarası, yoksa sayfa
    const categoriesPerPage = 4  //1 sayfada gösterilecek kategori sayısı
    const totalCategory = await Category.find().countDocuments() //toplam kategori sayısı

    //sayfa geçişi
    const categories = await Category.find({}).sort('-dateCreated')
    .skip((page-1) * categoriesPerPage).limit(4)
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
