const Furniture = require('../models/Furniture')
const Category = require('../models/Category')


exports.createFurniture = async (req,res) => {
    try {
        const furniture = await Furniture.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        })
        res.status(201).redirect('/furnitures')
    }catch(error){
        res.status(400).redirect('/furnitures')
    }
}

exports.getAllFurnitures = async (req,res) => {
    try{
        const furnitures = await Furniture.find({}).sort('-createdAt')
        const categories = await Category.find()
        res.status(200).render('furnitures', {
            furnitures,
            categories,
            page_name: "furnitures"
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}
exports.getFurniture = async (req, res) => {
    try{
    const furnitures = await Furniture.find()
    const furniture = await (await Furniture.findOne({slug: req.params.slug}))
        res.status(200).render('furniture', {
            furniture,
            furnitures,
            page_name: "furnitures",
        })
   }catch(err){
        res.status(400).redirect('/furnitures')
    }
}
exports.updateFurniture = async (req, res) => {
    try{
        const furniture = await Furniture.findOne({slug: req.params.slug})
        furniture.name = req.body.name
        furniture.category = req.body.category
        furniture.description = req.body.description
        
        furniture.save()

        res.status(200).redirect(`/furnitures/${req.params.slug}`)

    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}
