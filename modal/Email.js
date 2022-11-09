import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Create Schema

const MailSchema = new Schema({
    send_id : {
        type : Number,
        required : true
    },
    from_email: {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    email_body : {
        type : String,
        required : true
    },
    sent_status : {
        type : Number,
        required : true
    },
    status_code : {
        type : Number,
        required : true
    },
    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = Email = mongoose.model('email_send', MailSchema);