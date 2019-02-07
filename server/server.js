let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {user} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
            text : req.body.text
    });

    todo.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, ()=> {
    console.log("Started on port 3000");
});

module.exports = {app};


/*let newUser = new user({
    email : "aymen@123.tn"
});

newUser.save().then((docs) => {
    console.log(docs);
}, (e) => {
    console.log("Saving user erro", e);
});*/

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

