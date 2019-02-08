const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

let id = '5c576869b38ec32628a7d382';

/*let id = '5c5dea5126b0ed137ccebee4';

if(!ObjectID.isValid(id)){
    console.log("id not valid");
}*/

/*Todo.find({
    _id : id
}).then((todos) => {
    console.log("todos", todos);
});

Todo.findOne({
    _id : id
}).then((todo) => {
    console.log('todo', todo);
});*/

/*
Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log("id not found");
    }
    console.log('todo by id ', todo);
}).catch((e) => {
    console.log(e);
});*/

user.findById(id).then((user) => {
    if(!user){
        return console.log('id user not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
});