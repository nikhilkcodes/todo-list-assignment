// require express for setting up the express server
import express from "express";

// set up the port number
const port = 7000;

// importing the DataBase
const db = require('./config/mongoose');

// importng the Schema For tasks
const  Task  = require('./models/task');

// using express
const app = express();

// using static files
app.use(express.static("./views"));
// to use encrypted data
app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// rendering the App Page
app.get('/', function(req: express.Request, res: express.Response) {
    Task.find({}, function(err: Error | null, task: any) { // Use the appropriate type for 'task'
        if (err) {
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "Home", // Fix the typo in 'title'
            task: task
        });
    });
});


// creating Tasks
app.post('/create-task', function(req: express.Request, res: express.Response) {
    // console.log("Creating Task");

    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err: Error | null, newtask: any) { // Use the appropriate type for 'newtask'
        if (err) {
            console.log('error in creating task', err);
            return;
        }

        // console.log(newtask);
        return res.redirect('back');
    });
});


// deleting Tasks
app.get('/delete-task', function (req: express.Request, res: express.Response) {
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {

        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function (err: Error | null) { // Use the appropriate type for 'err'
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