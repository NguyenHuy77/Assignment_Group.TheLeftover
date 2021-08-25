const express = require('express');
const router= express.Router();
const Patient=require('./patient');

//Get all patients information
router.get('/', async (req,res)=>{
    try{
        const patients = await Patient.find();
        res.json(patients)
    }catch(e){
        res.json({message: e});
    }
});

//Create the new patient data
router.post('/',async (req,res)=>{
    const patient = new Patient(req.body);
    try {
      await patient.save();
      res.send(patient);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Get patient info by ID
router.get('/:patientID', async (req,res)=>{
    try{
        const patient = await Patient.findById(req.params.patientID);
        res.json(patient)
    }catch(e){
        res.json({message: e});
    }
});

//delete patient info by ID
router.delete('/:patientID', async (req,res) => {
    try{
        const removedPatient = await Patient.remove({_id:req.params.patientID});
        res.json(removedPatient)
    }catch(e){
        res.json({message: e});
    }
})

//update new status about patient
router.patch('/:patientID', async (req,res) => {
    try{
        await Patient.findByIdAndUpdate(req.params.patientID, req.body);
        await Patient.save();
        res.send(Patient);
    }catch(e){
        res.json({message: e});
    }
})

module.exports = router;