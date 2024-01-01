const express = require('express')
const {getUserAPI, 
    postCreateUserAPI, 
    putUpdateUserAPI, 
    deleteUserAPI, 
    postUploadSingleFileAPI} = require('../controllers/apiControllers') 
const {
    postCreateCustomerAPI,
    postCreateArrayCustomerAPI,
    getAllCustomersAPI,
    updateCustomerAPI,
    deleteCustomerAPI,
    deleteArrayCustomerAPI} = require('../controllers/customerController')
const {
    postCreateAProjectAPI,
    getAllProjectAPI,
    updateProjectAPI,
    deleteProjectAPI
} = require('../controllers/projectController')

const {
    postCreateTaskAPI,
    getAllTaskAPI,
    updateTaskAPI,
    deleteTaskAPI
} = require('../controllers/taskController')

const routerAPI = express.Router()

routerAPI.get('/users', getUserAPI)
routerAPI.post('/users', postCreateUserAPI)
routerAPI.put('/users', putUpdateUserAPI)
routerAPI.delete('/users', deleteUserAPI)
routerAPI.post('/file', postUploadSingleFileAPI)

routerAPI.post('/customers', postCreateCustomerAPI)
routerAPI.post('/customers-arr', postCreateArrayCustomerAPI)
routerAPI.get('/customers', getAllCustomersAPI)
routerAPI.put('/customers', updateCustomerAPI)
routerAPI.delete('/customers', deleteCustomerAPI)
routerAPI.delete('/customers-arr', deleteArrayCustomerAPI)

routerAPI.post('/projects', postCreateAProjectAPI)
routerAPI.get('/projects', getAllProjectAPI)
routerAPI.put('/projects', updateProjectAPI)
routerAPI.delete('/projects', deleteProjectAPI)

routerAPI.post('/task', postCreateTaskAPI)
routerAPI.get('/task', getAllTaskAPI)
routerAPI.put('/task', updateTaskAPI)
routerAPI.delete('/task', deleteTaskAPI)

module.exports = routerAPI