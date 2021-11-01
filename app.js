const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const mongoOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}

MongoClient.connect(url, mongoOptions, 
    (err, client) => {
    if (err) {
        return console.log(err);
    }

    // specifying a db to access
    const db = client.db('MyDb');
    console.log(`DB connected: ${url}`);
});


const names = db.collection('names');

names.insertOne({ name: 'Bruce Wayne' }, (err, result) => {});      // to insert a document into as existing collection

// to insert multiple docs at once
names.insertMany([
    { name : 'Bruce Wayne'},
    { name: 'Thomas Wayne' },
    { name: 'Martha Wayne'}
], (err, results) => {});

// find all docs
names.find().toArray((err, results) => {
    console.log(results);
})

