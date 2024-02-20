const Customer = require('../models/customer')
const aqp = require('api-query-params')

const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        })
        return result
    } catch(err) {
        return null
    }
}

const createArrayCustomerService = async (arrCustomer) => {
    try {
        let result = await Customer.insertMany(arrCustomer)
        return result
    } catch(err) {
        return null
    }   
}

const getAllCustomersService = async(pagination) => {
    
    try {
       let result = null 

       if(pagination.limit!=null && pagination.page!=null) {
            let query = aqp(pagination)
            let filter = query.filter
            let limit = pagination.limit
            let page = filter.page
            let offset = (page-1) * limit 

            delete filter.page

            result = await Customer.find(filter).skip(offset).limit(limit)   
       }
       else {
            
            result = await Customer.find({})
       }
   
       return result 
    } catch (err) {
        return null
    }
}

const updateCustomerService = async(customer) => {
    try {
        let result = await Customer.updateOne({_id: customer.id}, {name: customer.name, email: customer.email, address: customer.address, phone: customer.phone})
        return result 
    } catch (err) {
        return null
    }
}

const deleteCustomerService = async(id) => {
    try {
        let result =  await Customer.deleteById(id)
        return result 
    } catch (err) {
        return null
    }
}

const deleteArrayCustomerService = async(ids) => {
    try {
        let result =  await Customer.delete({_id: {$in: ids}})
        return result 
    } catch (err) {
        return null
    }
}

module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomersService,
    updateCustomerService,
    deleteCustomerService,
    deleteArrayCustomerService
}