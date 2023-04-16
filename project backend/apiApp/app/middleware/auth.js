const jwt = require("jsonwebtoken")
const userModel = require("../database//models/user")

class Auth {
    // For User
    static auth = async(req, res, next)=>{
        try{
        const token = req.header("Authorization").replace("bearer ", "")
        const decoded = jwt.verify(token,'userToken')
        const userData = await userModel.findOne({_id: decoded._id,"tokens.token":token,})
        if(!userData) throw new Error("unAuthorized")
            req.user = userData
            req.token = token
        next()
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                data:e, 
                message:e.message
            })
        }
    }

    //If User Is Admin
    static authAdmin = async (req, res, next) => {
        try{
            const token = req.header("Authorization").replace("bearer ", "")
            const decoded = jwt.verify(token, "userToken")
            const userData = await userModel.findOne({ _id: decoded._id, "tokens.token":token, userLevel:"admin" })
            // res.send(userData)
            if(!userData) throw new Error("you are not an admin")
                req.user = userData
                req.token = token
            next()
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                data:e, 
                message:e.message
            })
        }
    };
}
module.exports = Auth