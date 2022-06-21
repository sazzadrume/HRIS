const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const Employee = require('../../models/Employee');
const auth = require('../../midleware/auth')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const config = require('config')
router.get('/',auth,async (req,res)=>{
    let employee = await Employee.find()
    res.json({employee})
})
router.get('/find',auth,async (req,res)=>{
    try{
        console.log('eid: '+req.query.eid)
       // const {eid} = req.query.eid
        let employee = await Employee.findOne({eid: req.query.eid})
       
        if(!employee){
            return res.status(400).json({msg:'employee not found'})
        }
        res.json({employee})
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:'Server error'})
    }
    
})

router.delete('/emp/:eid',auth,async (req,res)=>{
    try{
        console.log('eid: '+req.params.eid)
       // const {eid} = req.query.eid
         await Employee.findOneAndRemove({eid: req.params.eid})
        res.json({msg:'employee has been removed for eid: '+req.params.eid})
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:'Server error'})
    }
    
})

router.post('/',auth,[
    check('eid','Employee id is required').not().isEmpty(),
    check('ename','Name is required').not().isEmpty(),
    check('ofcEmail','Please include valid imail').isEmail(),
    check('dept','Department is required').not().isEmpty(), 
    check('project','Project is required').not().isEmpty(), 
    check('empType','Employee Type is required').not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body)
    const {eid,ename,dept, project, ofcLocation, ofcEmail, photos, empType } = req.body
    try{
        console.log({eid})
        let employee = await Employee.findOne({eid})
       
        
    if(employee){
        let employeeFields = {}
       
        employeeFields.eid = employee.eid
        employeeFields.ename = ename
        employeeFields.dept = dept
        employeeFields.project = project
        employeeFields.ofcLocation = ofcLocation
        employeeFields.ofcEmail = ofcEmail
        employeeFields.photos = photos
        employeeFields.empType = empType
        console.log("emp fields: "+employeeFields)
        employee = await Employee.findOneAndUpdate({eid},{$set:employeeFields},{new:true})
        return res.json({employee})
    }
    employee = new Employee({
        eid,
        ename,
        dept, 
        project, 
        ofcLocation, 
        ofcEmail, 
        photos, 
        empType
    })

    await employee.save()
    res.json({employee,msg:"successfully employee information added"})
    }catch(err){
        console.log(err)
        res.status(500).json({error:[{msg:'Internal server error'}]})
    }

});

// router.put('/',auth,[
//     //check('eid','Employee id is required').not().isEmpty(),
//     check('ename','Name is required').not().isEmpty(),
//     check('ofcEmail','Please include valid imail').isEmail(),
//     check('dept','Department is required').not().isEmpty(), 
//     check('project','Project is required').not().isEmpty(), 
//     check('empType','Employee Type is required').not().isEmpty()
// ],async (req,res)=>{
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     console.log(req.body)
//     const {eid,ename,dept, project, ofcLocation, ofcEmail, photos, empType } = req.body
//     try{
//         console.log({eid})
//         let employee = await Employee.findOne({eid})
//     if(employee){
//         return res.status(400).json({errors:[{msg:"Employee already exist for this ID"}]})
//     }
//     employee = new Employee({
//         eid,
//         ename,
//         dept, 
//         project, 
//         ofcLocation, 
//         ofcEmail, 
//         photos, 
//         empType
//     })

//     await employee.save()
//     res.json({employee,msg:"successfully employee information added"})
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error:[{msg:'Internal server error'}]})
//     }

// });

module.exports = router;