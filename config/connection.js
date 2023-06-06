const { connect, connection } = require('mongoose');

//don't forget to add in the database name
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1"27017/';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;