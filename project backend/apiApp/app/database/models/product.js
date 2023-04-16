const mongoose = require("mongoose")
const categoryModel = require("../models/category")
const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        trim:true,
        required: true,
        ref:"cate"
    },
    image: {
        type: String, 
        trim: true, 
        default: "-"
    },
    title: {
        type: String, 
        trim: true,
        minLength:5,
        maxLength:15,
        required: true
    },
    content: {
        type: String, 
        trim: true,
        minLength:5,
        maxLength:50,
        required: true
    },
    price: {
        type: Number, 
        trim: true, 
    },
},
    { timestamps: true }
)

productSchema.pre("save", async function () {
    if (this.isModified("category")) {
        const category = await categoryModel.findOne({ name: this.category });
        if (category) {
            await category.save();
        } else {
            const myCategory = categoryModel({ name: this.category });
            await myCategory.save();
        }
    }
})

productSchema.pre("remove", async function () {
    const category = await categoryModel.findOne({ name: this.category });
    category.save();
})

productSchema.methods.toJSON = function () {
    const product = this.toObject();
    delete product.__v;
    return product;
}

productSchema.methods.addPic = async function(file) {
    const lastImage = this.image == 'imageProduct.jpg'? null : this.image
    this.image = file.filename
    if (lastImage) fs.unlinkSync(path.join(__dirname, '../../public', lastImage))
}
const Product = mongoose.model("Product", productSchema)
module.exports = Product