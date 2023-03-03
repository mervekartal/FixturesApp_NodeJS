const mongoose = require('mongoose')
const slugify = require('slugify')
const Schema = mongoose.Schema

const FurnitureSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

FurnitureSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict: true //gereksiz sembolleri siler
    })
    next()
})

const Furniture = mongoose.model('Furniture',FurnitureSchema)
module.exports = Furniture
