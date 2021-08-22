const db = require("../models");
const Information = db.information;

// Update Information
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Information.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update!`,
        });
      } else res.send({ message: "Updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating!",
      });
    });
};

// Delete Information
exports.delete = (req, res) => {
  const id = req.params.id;

  Information.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete!`,
        });
      } else {
        res.send({
          message: "Deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete!",
      });
    });
};
