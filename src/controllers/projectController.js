const Project = require('../models/project')
const {
    createAProjectService,
    getAllProjectService,
    updateProjectService,
    deleteProjectService
} = require('../services/projectService')

const  postCreateAProjectAPI = async(req, res) => {
    const data = req.body

    let result = await createAProjectService(data)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const getAllProjectAPI = async(req,res) => {
    let result = await getAllProjectService(req.query)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const updateProjectAPI = async(req,res) => {
    let result = await updateProjectService(req.body)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const deleteProjectAPI = async(req,res) => {
    let result = await deleteProjectService(req.body.id)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

module.exports = {
    postCreateAProjectAPI,
    getAllProjectAPI,
    updateProjectAPI,
    deleteProjectAPI
}

