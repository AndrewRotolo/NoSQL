const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
} = require('../../controllers/ThoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).post(updateThought);

module.exports = router;