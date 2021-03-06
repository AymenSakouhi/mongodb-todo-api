const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
require('./config/config');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});


//GET /todos/id
app.get('/todos/:id',(req, res) => {

    let id = req.params.id;

    if(!ObjectID.isValid(id)){
       res.status(404).send('not found at all!');
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});



app.delete('/todos/:id', (req, res) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo)=> {
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=> {
        res.status(400).send();
    });

});


//PATCH
app.patch('/todos/:id', (req, res) => {
   let id = req.params.id;
   let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
      return  res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo)=> {
        if (!todo) {
          return  res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=> {
        res.status(400).send();
    })
});

//*******************************USERS***********************************

app.post('/users', (req, res) => {

    let body = _.pick(req.body, ['email', 'password']);

    let user = new User(body);

    user.save().then(()=> {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});




app.get('/users/me',authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
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

