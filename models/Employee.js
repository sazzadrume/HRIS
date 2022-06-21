const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    eid:{
        type: Number,
        required: true
    },
    ename:{
        type: String,
        required: true
    },
    
    dept:{
        type: String,
        required: true
    },
    project:{
        type: String,
        required: true
    },
    ofcLocation:{
        type: String,
        required: true
    },
    ofcEmail:{
        type: String,
        required: true
    },
    photos:{
        type: String,
        
    },
    empType:{
        type: String,
        required: true
    },
})

module.exports = Employee = mongoose.model('employee',EmployeeSchema)

