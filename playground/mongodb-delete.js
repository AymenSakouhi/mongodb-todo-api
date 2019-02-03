// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApp',{ useNewUrlParser: true } ,(err, client) => {
    if(err) {
        return console.log('unable to connect to mongodb sever');
    }
    console.log('connected to MongoDB server');
    const db = client.db('todoApp');

    /*db.collection('Todos').deleteMany({text : 'eat dinner'}).then((result) => {
        console.log(result);
    });*/

    /*db.collection('Todos').deleteOne({text : 'eat dinner'}).then((result) => {
        console.log(result);
    });*/

   /* db.collection('Todos').findOneAndDelete({completed : false}).then((result) => {
        console.log(result);
    });

    client.close();
});*/

        /*db.collection('Users').deleteMany({name : 'Aymen'}).then((result) => {
                console.log(result);
        });*/

        db.collection('Users').findOneAndDelete({_id : new ObjectID('5c570a83ed4e9b2414700f94')}).then((result) => {
                console.log(result);
        });




client.close();
});