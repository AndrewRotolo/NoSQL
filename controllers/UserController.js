const { User } = require('../models');
const { ObjectId } = reqiore('mongoose');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json((users)))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__V')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No matching user found' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No matching user found' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No matching user found' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err))
    }
}