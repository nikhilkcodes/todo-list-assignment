"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require express for setting up the express server
const express_1 = __importDefault(require("express"));
// set up the port number
const port = 7000;
// importing the DataBase
const db = require('./config/mongoose');
// importng the Schema For tasks
const Task = require('./models/task');
// using express
const app = (0, express_1.default)();
// using static files
app.use(express_1.default.static("./views"));
// to use encrypted data
app.use(express_1.default.urlencoded());
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// rendering the App Page
app.get('/', function (req, res) {
    Task.find({}, function (err, task) {
        if (err) {
            console.log('Error in fetching tasks from db');
            return;
        }
        return res.render('home', {
            title: "Home",
            task: task
        });
    });
});
// creating Tasks
app.post('/create-task', function (req, res) {
    // console.log("Creating Task");
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function (err, newtask) {
        if (err) {
            console.log('error in creating task', err);
            return;
        }
        // console.log(newtask);
        return res.redirect('back');
    });
});
// deleting Tasks
app.get('/delete-task', function (req, res) {
    // get the id from query
    var id = req.query;
    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                console.log('error in deleting task');
            }
        });
    }
    return res.redirect('back');
});
// make the app to listen on asigned port number
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
