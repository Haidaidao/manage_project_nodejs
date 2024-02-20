const User = require('../models/user')
const {uploadSingleFile, uploadMultiFile} = require("../services/fileService")

const getUserAPI = async(req, res) => {
    let results = await User.find({})
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const postCreateUserAPI = async (req, res) => {
    let user = req.body

    let userRes =  await User.create({
        email: user.email,
        name: user.name,
        city: user.city
    })

    return res.status(200).json({
        errorCode: 0,
        data: userRes
    })
}

const putUpdateUserAPI = async (req, res) => {
    let user = req.body

    let userPut = await User.updateOne({_id: user.id}, {name: user.name, email: user.email, city: user.city})

    return res.status(200).json({
        errorCode: 0,
        data: userPut
    })
}

const deleteUserAPI = async (req, res) => {
    const id = req.body.id
    const user = await User.deleteOne({
        _id: id
    })
    
    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}

const postUploadSingleFileAPI = async(req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    await uploadMultiFile(req.files.image)
   
    return res.send('OK')
}

module.exports = {
    getUserAPI,
    postCreateUserAPI,
    putUpdateUserAPI, 
    deleteUserAPI,
    postUploadSingleFileAPI
}