const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

MongoClient.connect(url, mongoOptions,
    (err, client) => {
        if (err) {
            return console.error(err);
        }

        else {
            console.log(`DB connected: ${url}`);
            const db = client.db('register');   // to select a db in mongodb

            const names = db.collection('names');  // create and get collection

            // inserts single docs
            names.insertOne({ name: 'Bruce Wayne '}, (err, result) => { });

            // inserts multiple docs at once
            names.insertMany([
                { name: 'Martha Wayne'},
                { name: 'Thomas Wayne' },
                { name: 'Alfred Pennyworth' }
            ], (err, results) => { });

            // find all docs
            names.find().toArray((err, results) => {
                console.log(results);
            });

            // find single doc
            names.find({ name: 'Bruce Wayne' }).toArray((err, result) => {
                console.log(result);
            });

            // fetches the topmost doc matches the filter
            names.findOne({ name: 'Bruce Wayne'}, (err, result) => {
                console.log(result);
            });
            // const find = async () => {
            //     try {
            //         return await names.findOne({ name: 'Martha Wayne'});
            //     }
            //     catch (err) {
            //         console.log(err);
            //     }
            // };
            // find();

            // update a doc
            names.updateOne({ name: 'Alfred Pennyworth '}, {$set: {
                name: 'Jim Gordon'
            }}, (err, result) => {
                console.log(result);
            });

            // del a doc
            names.deleteOne({ name: 'Thomas Wayne'}, (err, result) => {
                console.log(result);
            });
            // client.close()
        }
});