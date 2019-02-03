// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApp',{ useNewUrlParser: true } ,(err, client) => {
    if(err) {
        return console.log('unable to connect to mongodb sever');
    }
    console.log('connected to MongoDB server');
    const db = client.db('todoApp');

    /*db.collection('Todos').find({
        _id : new ObjectID('5c5707b1bee6931be8e0db8f')
    }).toArray().then((docs) => {
        console.log("Todos");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        return('Unable to fetch the data',err);
    });*/


    /*db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count ${count}`);
    }, (err) => {
        return('Unable to fetch the data',err);
    });*/

    db.collection('Users').find(
        {
            name: "borhen"
        }
        ).count().then((count) => {
        console.log(`Users count ${count}`);
    }, (err) => {
        return('Unable to fetch the data',err);
    });

    db.collection('Users').find({
        name: "borhen"
    }).toArray().then((docs) => {
        console.log("Users");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        return('Unable to fetch the data',err);
    });

    client.close();
});