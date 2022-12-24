const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    midterm: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    final: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    totalGrade: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    succeseed: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model("Grades", gradesSchema);