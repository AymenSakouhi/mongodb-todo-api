let mongoose = require('mongoose');

let user = mongoose.model('Users', {
    name : {
        type : String,
        required : true,
        trim : true,
        minlength: 1,
        default: "new user"
    },
    email : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {
    user
}