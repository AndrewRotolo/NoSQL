const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    //wipes existing db items
    await Thought.deleteMany({});
    await User.deleteMany({});
    await Reaction.deleteMany({});

    //add in the actual seed data later

    process.exit(0);

});



