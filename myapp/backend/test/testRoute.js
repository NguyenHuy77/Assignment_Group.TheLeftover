const express = require("express");
const router = express.Router();
const Test = require('./test')

//Get all tests information
router.get("/", async (req, res) => {
    try {
      const tests = await  Test.find();
      res.json( tests);
    } catch (e) {
      res.json({ message: e });
    }
  });

  //Create the new test data
  router.post("/", async (req, res) => {
    const test = new Test(req.body);
    try {
      await test.save();
      res.send( test);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Get test info by ID
  router.get("/:testID", async (req, res) => {
    try {
      const  test = await Test.findById(req.params.testID);
      res.json( test);
    } catch (e) {
      res.json({ message: e });
    }
  });

  //get event by patientID
  router.get("/patient/:patientID", async (req, res) => {
    try {
      const  event = await Event.find({patientID:req.params.patientID});
      res.json( event);
    } catch (e) {
      res.json({ message: e });
    }
  });

  //delete event info by ID
  router.delete("/:testID", async (req, res) => {
    try {
      const removedTest = await Test.remove({ _id: req.params.testID });
      res.json(removedTest);
    } catch (e) {
      res.json({ message: e });
    }
  });

  router.patch('/:testID', async (req,res) => {
    try {
        await Test.findByIdAndUpdate(req.params.testID, req.body);
        await Test.save();
        res.send(Test);
      } catch (error) {
        res.status(500).send(error);
      }
})


  module.exports = router;
