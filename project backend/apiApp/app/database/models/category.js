const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    name: {
        type:String, 
        trim:true,
        minLength: 5,
        maxLength: 15,
        required:true
    },
})

categorySchema.virtual("myProducts", {
    ref:"Products",
    localField: "name",
    foreignField:"category"
})

const Category = mongoose.model("Category", categorySchema)
module.exports = Category