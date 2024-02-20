const Project = require('../models/project')
const aqp = require('api-query-params')
const { MongoClient } = require('mongodb')
const { model } = require('mongoose')

const checkElementInArr = (arr, element) => {
    for(let i = 0 ; i < arr.length; i++) {
        if(arr[i]===element) {
            return false
        }      
    }
    return true
}
const createAProjectService = async(data) => {

    let result = null
    try {

        if(data.type === "EMPTY-PROJECT")
            result = await Project.create(data)
        else if(data.type === "ADD-USER") {
            let myProject = await Project.findById(data.projectId)
            let stringArray = myProject.usersInfor.map(objectId => objectId.toString())
            
            for(let i = 0 ; i < data.usersArr.length; i++){
                if(stringArray.length==0)
                    myProject.usersInfor.push(data.usersArr[i])
                else if(checkElementInArr(stringArray, data.usersArr[i].toString())) {
                    myProject.usersInfor.push(data.usersArr[i])
                }
            }
           result = await myProject.save()
        }
        else if(data.type === "REMOVE-USER"){
            let myProject = await Project.findById(data.projectId)
            let stringArray = myProject.usersInfor.map(objectId => objectId.toString())

            for(let i = 0 ; i < data.usersArr.length; i++){
                if(!checkElementInArr(stringArray, data.usersArr[i].toString()))
                    myProject.usersInfor.pull(data.usersArr[i])
            }
           result = await myProject.save()          
        }
        else if(data.type === "ADD-TASKS") {
            let myProject = await Project.findById(data.projectId)
            let stringArray = myProject.tasks.map(objectId => objectId.toString())
            for(let i = 0 ; i < data.tasksArr.length; i++){
                if(stringArray.length==0)
                    myProject.tasks.push(data.tasksArr[i])
                else if(checkElementInArr(stringArray, data.tasksArr[i].toString())) {
                    myProject.tasks.push(data.tasksArr[i])
                }
            }
            result = await myProject.save()   
        }
        else {
            let myProject = await Project.findById(data.projectId)
            let stringArray = myProject.tasks.map(objectId => objectId.toString())
            for(let i = 0 ; i < data.tasksArr.length; i++){
                if(!checkElementInArr(stringArray, data.tasksArr[i].toString())) {
                    myProject.tasks.pull(data.tasksArr[i])
                }     
            }
           result = await myProject.save()    
        }

        return result
    } catch (error) {
        return null 
    }

}

const getAllProjectService = async(data) => {
    let result = null

    let query = aqp(data) 
    let filter = query.filter
    let limit = data.limit
    let page = filter.page
    let offset = (page-1) * limit 
    let populate = query.population
    
    delete filter.page

    result = await Project.find(filter).populate(populate).skip(offset).limit(limit) 
    return result
}

const updateProjectService = async(data) => {
    let result = null

    result = await Project.updateOne({_id: data.id}, {name: data.name, startDate: data.startDate, endDate: data.endDate, discription: data.discription})

    return result
}

const deleteProjectService = async(id) => {
    let result = null
    result =  await Project.deleteById(id)

    return result
}

module.exports = {
    createAProjectService,
    getAllProjectService,
    updateProjectService,
    deleteProjectService
}