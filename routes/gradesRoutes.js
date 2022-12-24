const express = require("express");
const gradesRouter = express.Router();
const iNeedTheToken = require("../middleware/iNeedTheToken");
const {
    addStudentInfo,
    getAllstudents,
    updateStudent,
    deleteStudent,
    getStudentsWhoSucceseed
} = require("../controllers/gradesController");

gradesRouter.use(iNeedTheToken);

gradesRouter.route("/addStudent")
    .post(addStudentInfo);
gradesRouter.route("/students")
    .get(getAllstudents);
gradesRouter.route("/students/:id")
    .delete(deleteStudent)
    .put(updateStudent);
gradesRouter.get("/studentsWhoSucceseed", getStudentsWhoSucceseed);
module.exports = gradesRouter;