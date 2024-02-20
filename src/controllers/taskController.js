const Task = require('../models/project') 

const {
    createTaskService,
    getAllTaskService,
    deleteTaskService,
    updateTaskService
} = require('../services/taskService')

const  postCreateTaskAPI = async(req, res) => {
    const data = req.body

    let result = await createTaskService(data)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const getAllTaskAPI = async(req,res) => {
    let result = await getAllTaskService(req.query)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const updateTaskAPI = async(req,res) => {
    let result = await updateTaskService(req.body)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const deleteTaskAPI = async(req, res) => {
    let result = await deleteTaskService(req.body.id)

    return res.status(200).json({
        error: 0,
        data: result
    })
}

module.exports = {
    postCreateTaskAPI,
    getAllTaskAPI,
    updateTaskAPI,
    deleteTaskAPI
}