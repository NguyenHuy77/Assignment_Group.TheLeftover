const express = require("express");
const router = express.Router();
const Event = require("./event");

//Get all events information
router.get("/", async (req, res) => {
    try {
      const events = await  Event.find();
      res.json( events);
    } catch (e) {
      res.json({ message: e });
    }
  });

  //Create the new event data
  router.post("/", async (req, res) => {
    const  event = new Event(req.body);
    try {
      await event.save();
      res.send( event);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Get event info by ID
  router.get("/: eventID", async (req, res) => {
    try {
      const  event = await Event.findById(req.params.eventID);
      res.json( event);
    } catch (e) {
      res.json({ message: e });
    }
  });

  //delete event info by ID
  router.delete("/:eventID", async (req, res) => {
    try {
      const removedEvent = await Event.remove({ _id: req.params.eventID });
      res.json(removedEvent);
    } catch (e) {
      res.json({ message: e });
    }
  });

  module.exports = router;
