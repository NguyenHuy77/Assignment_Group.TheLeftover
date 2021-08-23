const db = require("../Admin");//Rewrite for final version
const Information = db.information; //Copieds, DB where?
//Psuedo code, don't work, need to learn/install MongoDB
//Source of code from https://coursework.vschool.io/mongoose-crud/
//How to test code?

//CREATE
const newRoom = new room(req.body);
newTodoObj.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newRoom); 
})
;
//READ
room.find((err, room) => {
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err)
    // send the list of all people
    return res.status(200).send(room);
});
//UPDATE
room.findByIdAndUpdate(
    // the id of the item to find
    req.params.id,
    
    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body,
    
    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},
    
    // the callback function
    (err, room) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(room);
    }
)
//DELETE
room.findByIdAndRemove(req.params.todoId, (err, room) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "room successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});

//Add user to room
//extend(?) to patient control