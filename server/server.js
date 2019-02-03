let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });

let Todo = mongoose.model('Todo',{
    text : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    completed: {
        type: Boolean,
        default : false
    },
    completedAt: {
        type: Number,
        default: null
    }
});


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

let newUser = new user({
    email : "aymen@123.tn"
});

newUser.save().then((docs) => {
    console.log(docs);
}, (e) => {
    console.log("Saving user erro", e);
});

/*
let otherTodo = new Todo({
   text: "    make a coffee    ",

});

otherTodo.save().then((doc) => {
    console.log("saved to do", doc);
}, (e) => {
    console.log("unable to store data", e);
} );
*/

