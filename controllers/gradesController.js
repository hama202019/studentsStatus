const Grades = require("../models/gradesModel");
const mongoose = require("mongoose");

const addStudentInfo = async (req, res) => {
    const {name, midterm, final} = req.body;
    if(!name || !midterm || !final) return res.status(400).json({error: "All fields must be filled!"});
    try {
        const totalGrade = !isNaN(midterm) && !isNaN(final) ? (midterm * 40/100 + final * 60/100) : null;
        const succeseed = !isNaN(totalGrade) ? totalGrade >= 50 ? true : false : null;
        const results = await Grades.create({name, midterm, final, totalGrade, succeseed, userId: req.user._id});
        res.status(201).json({results});
    } catch (err) {
        res.status(400).json({error: err});
    };
};

const getAllstudents = async (req, res) => {
    const students = await Grades.find({userId: req.user._id});
    res.status(200).json({students});
};

const deleteStudent = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({error: "No such student!"});
    try {
        const deletedStudent = await Grades.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({deletedStudent});
    } catch(error){
        res.status(400).json({error});
    };
};

const getStudentsWhoSucceseed = async (req, res) => {
    const students = await Grades.find({userId: req.user._id, succeseed: true});
    res.status(200).json({students});
}

const updateStudent = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({error: "No such student!"});
    const updatedStudent = await Grades.findByIdAndUpdate({_id: req.params.id}, {...req.body});
    if(!updatedStudent) return res.status(400).json({error: "No such student"});
    res.status(200).json({updatedStudent});
};

module.exports = {addStudentInfo, getAllstudents, deleteStudent, updateStudent, getStudentsWhoSucceseed};