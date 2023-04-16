
const productModel = require("../database/models/product")
const categoryModel = require("../database/models/category")
class product {

    static add = async (req, res) => {
        try {
            const products = new productModel(req.body)
            await products.save()
            res.status(200).send({
                apiStatus: true,
                data: products,
                message: "product Added Successfully"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static imgUpload = async (req, res) => {
        try{
            const ext = path.extname(req.file.originalname)
            fs.renameSync(req.file.path, `${req.file.path}${ext}`)
            let oldImg 
            if(req.product.image)
            oldImg =path.join(__dirname,"../", "public", req.product.image)
            else 
            oldImg=null
            req.product.image = `${req.file.filename}${ext}`
            await req.user.save()
            if(oldImg) fs.unlinkSync(oldImg)
            res.send({product:req.product, b:req.body})
            }
            catch(e){
            res.send(e)
            }
    }
    static all = async (req, res) => {
        try {
            // const pageNum = req.query.pageNum
            // const pageLimit = req.query.pageLimit || 7
            // const count = await productModel.count()
            const products = await productModel.find()  //.limit(pageLimit).skip(pageLimit*pageNum)
            res.status(200).send({
                apiStatus: true,
                data: products,
                message: "products Fetched Successfully"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static findProducts = async (req, res) => {
        try {
            const category = await categoryModel.findOne({
                name: req.params.name,
            });
            await category.populate("myProducts");
            res.status(200).send({
                apiStatus: true,
                data: category,
                message: "products Found"
            })
        } 
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    };
    static single = async(req,res) =>{
        try{
            const product = await productModel.findById(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: product,
                message: "product data fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static userProducts = async(req,res)=>{
        try{
            console.log(req.user);
            await req.user.populate("myProducts")
            res.status(200).send({                
                apiStatus:true,
                data: req.user.myProducts,
                message:"All Products For User Fetched successfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                data:e, 
                message:e.message
            })
        }
    }
    static userSingle = async(req, res)=>{
        try{
            const single = await productModel.findById(req.params.id)
            res.status(200).send({
                data:single,
                message:"User Single Product Fetched",
                apiStatus:true
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                data:e, 
                message:e.message})
        }
    }
    static editProduct = async(req, res) => {
        try{
            const myUpdates = Object.keys(req.body)
            const allowedEdits = ["title", "content", "price","image"]
            const validEdits = myUpdates.every(
                (update) => allowedEdits.includes(update)
                )
            if(!validEdits) throw new Error ("Invalid Edits")
            const product = await categoryModel.findById(req.params.id)
            if(!product) throw new Error("Invalid Id")
            myUpdates.forEach(update => product[update]= req.body[update])
            await product.save()
            res.status(200).send({
                apiStatus: true,
                data: product,
                message: "All Category Fetched Successfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static delProduct = async(req, res) => {
        try{
            const product = await productModel.findByIdAndDelete(req.params.id);
            res.status(200).send({                
                apiStatus:true,
                data:product,
                message:"Product Deleted Successfully",
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                data:e, 
                message:e.message
            });
        };
    };
};


module.exports = product;