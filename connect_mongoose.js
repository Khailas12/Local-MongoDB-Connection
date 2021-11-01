const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/register';

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}

const server = (async () => {
    try {
        await mongoose.connect(url, mongoOptions);
        console.log(`MongoDB connected: ${url}`);
    }
    catch (err) {
        return console.error(err);
    }
});
server();