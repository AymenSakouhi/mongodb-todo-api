// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApp',{ useNewUrlParser: true } ,(err, client) => {
    if(err) {
        return console.log('unable to connect to mongodb sever');
    }
    console.log('connected to MongoDB server');
    const db = client.db('todoApp');

    /*db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5c5725bd3bf511f10edb17c4')},
        {
            $set: {
                completed: true
            }
        },
    {
        returnOriginal : false
    }).then((result) => {
        console.log(result);
    });*/

    db.collection('Users').findOneAndUpdate({name : "Andrew"}, {
        $set : {
            name : "Aymen"
        },
        $inc : {
            age : -0
        }
    },
        {
            returnOriginal: false
        }
    ).then((results) => {
        console.log(results);
    });

client.close();
});