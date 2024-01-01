const connection = require("../config/database")
const { use } = require("../routes/web")
const User = require('../models/user')
 
const getHomepage = async(req, res) => {
    let results = await User.find({})
    return res.render('homepage', {listUser: results})
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id

    // let user = await getUserById(userId)
    let user = await User.findById(userId).exec()

    return res.render('edit', {user: user})
}

const postUpdateUser = async (req, res) => {
    let user = req.body

    // await updateUserById(user.email,user.name,user.city,user.id)
    await User.updateOne({_id: user.id}, {name: user.name, email: user.email, city: user.city})

    res.redirect('/')
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id

    let user = await User.findById(userId).exec()
    return res.render('delete', {user: user})
}

const postHandleDeleteUser = async (req, res) => {
    const id = req.body.id
    await User.deleteOne({
        _id: id
    })
    return res.redirect('/')
}

const getCreatepage = (req, res) => {
    
    return res.render('create')
}

const postCreateUser = async (req, res) => {
    let user = req.body

    await User.create({
        email: user.email,
        name: user.name,
        city: user.city
    })

    res.send("Create user success")
}

module.exports = {
    getHomepage,
    postCreateUser,
    getCreatepage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleDeleteUser
}