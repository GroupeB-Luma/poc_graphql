
const mongo = require('mongoose');
const Schema = mongo.Schema;

const workshopsSchema = new Schema({
    name: String,
    roomId: String
});

module.exports = mongo.model('workshops', workshopsSchema);