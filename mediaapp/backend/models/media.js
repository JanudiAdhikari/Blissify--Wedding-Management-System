const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mediaSchema = new Schema({


    AlbumID : {
        type : String,
        required : true
    },
    EventID : {
        type : String,
        required : true
    },
    CoupleID : {
        type : String,
        required : true
    },
    AlbumName : {
        type : String,
        required : false
    },
    Description : {
        type : String,
        required : true
    },
    Date_Uploaded : {
        type : String,
        required : true
    },
    MediaType : {
        type : String,
        required : false
    },
    P_ID : {
        type : String,
        required : true
    }

})

const Media = mongoose.model("Media",mediaSchema)

module.exports = Media;