const {uploadSingleFile} = require('../services/fileService')
const {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomersService,
    updateCustomerService,
    deleteCustomerService,
    deleteArrayCustomerService} = require('../services/customerService')
const Joi = require('joi');


module.exports = {

    postCreateCustomerAPI: async (req,res) => {
        let customer = req.body

        let {
            name,
            address,
            phone,
            email,
            description
        } = req.body

        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(2)
                .max(30)
                .required(),

        })
        let check = schema.validate(customer, {abortEarly: false});


        let imgUrl = ""
        // Image Handle
        if (!req.files || Object.keys(req.files).length === 0) {
        }
        else {
            let result =  await uploadSingleFile(req.files.image)
            imgUrl = result.path
        }

        const customerData = {
            name: customer.name,
            address: customer.address,
            phone: customer.phone,
            email: customer.email,
            description: customer.description,
            image: imgUrl
        } 
        
        const resultCustomer = await createCustomerService(customerData)

        return res.status(200).json({
            error: 0,
            data: resultCustomer
        })
    },

    postCreateArrayCustomerAPI: async (req,res) => {
        let result = await createArrayCustomerService(req.body.customer)

        return res.status(200).json({
            error: 0,
            data: result
        })
        
    },

    getAllCustomersAPI: async (req,res) => {
        let pagination = req.query
        let result = null

        try {
            result = await getAllCustomersService(pagination)

            return res.status(200).json({
                error: 0,
                data: result
            })
        } catch (error) {
            return null
        }  
    },

    updateCustomerAPI: async (req,res) => {
        let customer = req.body

        try {
            let customerPut = await updateCustomerService(customer)
    
            return res.status(200).json({
                errorCode: 0,
                data: customerPut
            })
        } catch (error) {
            return null
        }
    },
    
    deleteCustomerAPI: async(req,res) => {
        let id = req.body.id
        try {
            let customer = await deleteCustomerService(id)
            return res.status(200).json({
                errorCode: 0,
                data: customer
            })
        } catch (error) {
            return null
        }
    },

    deleteArrayCustomerAPI: async(req,res) => {
        let ids = req.body.customersId
        try {
            let customer = await deleteArrayCustomerService(ids)
            return res.status(200).json({
                errorCode: 0,
                data: customer
            })
        } catch (error) {
            return null
        }       
    }
}