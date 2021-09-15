const express = require('express');
const router= express.Router();
const Room=require('./room');

//Get all Rooms
router.get('/', async (req,res)=>{
    try{
        const rooms = await Room.find();
        res.json(rooms)
    }catch(e){
        res.json({message: e});
    }
});

//Create new room data
router.post('/',async (req,res)=>{
    const room = new Room({
        roomNumber : req.body.roomNumber,
        roomType : req.body.roomType,
        bedCounts :req.body.bedCounts,
        available : req.body.available
    });

    try{
        const savedRoom = await room.save();
        res.json(savedRoom);
    }catch(e){
        res.json({message: e});
    }
});

 //Get room by ID
router.get('/:roomID', async (req,res)=>{
    try{
        const room = await Room.findById(req.params.roomID);
        res.json(room)
    }catch(e){
        res.json({message: e});
    }
});

// Delete room by RoomID
router.delete('/:roomID', async (req,res) => {
    try{
        const removedRoom = await Room.remove({_id:req.params.roomID});
        res.json(removedRoom)
    }catch(e){
        res.json({message: e});
    }
})

// Update room by RoomID
router.patch('/:roomID', async (req,res) => {
    try {
        await Room.findByIdAndUpdate(req.params.roomID, req.body);
        await Room.save();
        res.send(Room);
      } catch (error) {
        res.status(500).send(error);
      }
})



module.exports = router;