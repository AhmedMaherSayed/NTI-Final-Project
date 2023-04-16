const path = require("path")
const userModel = require("../database/models/user")
const cartModel = require("../database/models/cart")
const fs = require('fs')

class User {
    //User Controllers
    static register = async (req, res) => {
        try {
            const user = new userModel(req.body)
            const token = await user.generateToken()
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: {user , token},
                message: "User Added Successfully"
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
    static login = async (req, res) => {
        try {
            const user = await userModel.login(
                req.body.email, req.body.password)
                const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: {user , token},
                message: "User Sign In Successfully"
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
    static logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "Sign Out 'Done' "

            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message,

            })
        }
    }
    static logoutAll = async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: " Sign Out All 'Done' ",
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
    static editMyData = async (req, res) => {
        try {
            for (let key in req.body) {
                if (key != "password" && req.body[key]) {
                    req.user[key] = req.body[key];
                }
            }
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "Your Data Edited Successfully"
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
    static editPass = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
            if (!user) throw new Error("invalid id")
            const valid = await userModel.checkPass(user, req.body.oldPass)
            if (!valid) throw new Error("invalid password")
            user.password = req.body.password
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "Your Password Changed Successfully"
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
    static delMe = async (req, res) => {
        try {
            const user = await req.user.remove()
            if (!user) throw new Error("User Is Not Found")
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "Deleted User 'Done' "
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
    static me = (req, res) => {
        res.status(200).send({
            apiStatus: true,
            data: req.user,
            message: "User Data Fetched"
        })
    }
    static changeStatus = async (req, res) => {
        try {
            if (req.body.status == "activate")
                req.user.status = true
            else
                req.user.status = false
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "User Status Cahanged"
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
        try {
            const ext = path.extname(req.file.originalname)
            fs.renameSync(req.file.path, `${req.file.path}${ext}`)
            let oldImg
            if (req.user.image)
                oldImg = path.join(__dirname, "../", "public", req.user.image)
            else
                oldImg = null
            req.user.image = `${req.file.filename}${ext}`
            await req.user.save()
            res.send(req.user)
            if (oldImg) fs.unlinkSync(oldImg)
            res.send({ user: req.user, b: req.body })
        }
        catch (e) {
            res.send(e)
        }
    }
    static addAddress = async (req, res) => {
        try {
            req.user.addresses = req.user.addAddresses.concat(req.body)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "Your Address Added Successfully"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static editAddress = async (req, res) => {
        try {
            const adress = req.user.addresses.findIndex(address => address._id == req.params.id)
            req.user.addresses[adress] = { ...req.body, _id: req.params.id }
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "Your Address Edited Successfully"
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
    static pay = async (req, res) => {
        try {
            const cart = cartModel({...req.body, userId: req.user._id})
            const process = {
                processKind: 'pay',
                value: cart.total,
                cartId: cart._id,
                date: Date.now()
            }
            req.user.process = req.user.process.concat(process)
            await req.user.save()
            await cart.save()

            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "You Paid Your Order Successfully"
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


    //Admin Controllers
    static all = async (req, res) => {
        try {
            const user = await userModel.find()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "all Users Fetched successfully"
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
    static single = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id);
            if (!user) throw new Error("Invlid Id");
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "User Data Fetched successfully"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static edit = async (req, res) => {
        try {
            const user = await userModel.findByIdAndUpdate(req.params.id);
            if (!user) throw new Error("Invlid Id");
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "User Data Edited successfully"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static changeStatus = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id);
            if (req.body.status === "activate") user.status = true;
            else 
                user.status = false;
            await user.save();
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "User Status Changed successfully"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static delete = async (req, res) => {
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            if (!user) throw new Error("Invlid Id");
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "User Deleted successfully"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            });
        };
    };
};


module.exports = User;