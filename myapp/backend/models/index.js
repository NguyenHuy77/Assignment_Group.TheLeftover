const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin"];
db.url = dbConfig.url;
db.information = require("./info.model.js")(mongoose);

module.exports = db;
