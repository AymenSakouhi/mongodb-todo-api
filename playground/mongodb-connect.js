// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApp',{ useNewUrlParser: true } ,(err, client) => {
        if(err) {
            return console.log('unable to connect to mongodb sever');
        }
        console.log('connected to MongoDB server');
        const db = client.db('todoApp');

        /*db.collection('Todos').insertOne({
            text: 'go to coffee and drink a coffee',
            completed: false
        },(err, result) => {
            if(err) {
                return console.log("Unable to insert todo");
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        });*/

        /*db.collection('Users').insertOne({
            name : 'Aymen',
            age: 24,
            location : 'voronezh'
        },(err, result) => {
           if(err){
               return console.log("Unable to create the new Collection.log", err)
           }
            console.log(result.ops[0]._id.getTimestamp());
        });*/

        client.close();
});