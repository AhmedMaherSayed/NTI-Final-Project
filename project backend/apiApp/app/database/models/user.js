const mongoose = require ("mongoose")
const bcrypt = require('bcryptjs');
const productModel = require("./product")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 30,
        required: true,
    },
    age: {
        type: String,
        min: 10,
        max: 150,
        default:20,
    },
    image:{
        type:String,
        trim:true
    }, 
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        minLength: 3,
        maxLength: 35,
    },
    status:{
        type: Boolean,
        default: false,
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength: 5,
        maxLength: 100,
    },
    userLevel: {
        type: String,
        trim: true,
        enum: ["admin", "customer"],
        required: true,
        default:"customer"
    },
    addresses: [
        {
            addType: {
                type: String,
                trim: true,
                minLength: 10,
                maxLength: 80,
                required: true,
            },
            mobile: {
                type: String,
                trim: true,
                minLength: 12,
                maxLength: 12,
                required: true,
            },
        },
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true,
                unique:true
            }
        }
    ]
} ,{timestamps:true}
)


// Pre Save Data
userSchema.pre("save" , async function(){
    const data = this
    if (data.isModified("password"))
    data.password = await bcrypt.hash(data.password, 12)
})

// Pre Remove Products
userSchema.pre("remove", async function(){
    const user = this
    await productModel.deleteMany({owner: user._id}) 
})


userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    // delete userData.password
    delete userData._v
    // delete multi Token
    delete userData.tokens
    // delete userData._id
    return userData
}

// Generate Token
const jwt = require("jsonwebtoken")
userSchema.methods.generateToken = async function(){
    const user = this
    if(user.tokens.length==5) throw new Error("token Exdded")
    const token = jwt.sign({_id:user._id} , "userToken")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// Check Password
userSchema.statics.checkPass = async(user, oldPass) => {
    const isValid = await bcyptjs.compare(oldPass, user.password)
    return isValid
}
// Login and Check Pass
userSchema.statics.login = async(email, pass)=>{
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const isValid = await bcrypt.compare(pass, userData.password)
    if(!isValid) throw new Error("invalid password")
    return userData
}

// Add Addresses 
userSchema.methods.addAddresses = async function (addresses) {
    addresses.forEach(address => {
        this.addresses = this.addresses.concat(address);
    });
    await this.save();
}

// Relation Between User (seller) and Product Model
userSchema.virtual("myProducts", {
    ref:"Product",
    localField: "_id",
    foreignField:"userId"
})

const User = mongoose.model("User" , userSchema)
module.exports = User