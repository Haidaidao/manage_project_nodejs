const Task = require('../models/task')
const aqp = require('api-query-params')

const createTaskService = async (data) => {
    let result = null
    result = await Task.create(data)

    return result
}

const getAllTaskService = async(data) => {
    let result = null
    let query = aqp(data) 
    let filter = query.filter
    let limit = data.limit
    let page = filter.page
    let offset = (page-1) * limit

    delete filter.page

    result = await Task.find(filter).skip(offset).limit(limit) 
    return result
}

const updateTaskService = async(data) => {
    let result = null

    // result = await Task.updateOne({_id: data.id}, {name: data.name, startDate: data.startDate, endDate: data.endDate, discription: data.discription, status: data.status})
    result = await Task.updateOne({_id: data.id}, {...data})
    return result
}

const deleteTaskService = async(id) => {
    let result = null
    result =  await Task.deleteById(id)

    return result
}

module.exports = {
    createTaskService,
    getAllTaskService,
    deleteTaskService,
    updateTaskService
}