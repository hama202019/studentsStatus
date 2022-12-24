require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require("./routes/userRoutes");
const gradesRouter = require("./routes/gradesRoutes");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", gradesRouter);


mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`The server is up and listening on port ${process.env.PORT}`);
        })
    }).catch(err => console.log(err));