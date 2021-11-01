const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';

const mongoOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

MongoClient.connect(url, mongoOptions,
    (err, client) => {
        if (err) {
            return console.log(err);
        }
        
        else {

            console.log(`DB connected: ${url}`);
            const db = client.db('register');   // to select a mongodb db
    
            const names = db.collection('names');   // create and get collection
            
            // insert into an existing document
            names.insertOne({ name: 'Bruce Wayne' }, (err, result) => {});  
            
            // inserts multiple docs at once
            names.insertMany([
                { name: 'Thomas Wayne'},
                { name: 'Alfred Pennyworth' },
                { name: 'Martha Wayne' }
            ], (err, results) => {});
            
            // to find all docs
            names.find().toArray((err, results) => {
                console.log(names);
            });   
            
            // to find a specific doc
            names.find({ name: 'Bruce Wayne '}).toArray((err, result) => {
                console.log(result);
            });
    
            // gets the topmost doc matches the filter
            // names.findOne({ name: 'Bruce Wayne' }, (err, result) => {
            //     console.log(result);
            // });
            const find = async () => {
                try {
                    return await names.findOne({ name: 'Martha Wayne'});
                }
                catch (err) {
                    console.log(err);
                }
            };

    
            // updating an existing doc
            names.updateOne({ name : 'Thomas Wayne' }, {
                $set: { name: 'Jim Gordon' },
            }, (err, result) => {
                console.log(result);
            });
    
            // del doc
            names.deleteOne({ name: 'Jim Gordon' }, (err, result) => {
                console.log(result);
            });

            client.close()      // closing connection
        }
});        
