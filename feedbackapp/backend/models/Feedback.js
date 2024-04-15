const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    feedback_id : {
        type : Number
    },
    response: {
        type : String,
        required : true
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;