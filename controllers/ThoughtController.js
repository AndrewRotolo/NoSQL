const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-_V')
            .then((thought) =>
                !course
                    ? res.status(404).json({ message: 'No Thought found'})
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoght found'})
                    : User.findOneAndUpdate(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId }},
                        { new: true }
                    ))
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but no matching user found' })
                    : res.json({ message: 'Deletion successful' }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found' })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
};