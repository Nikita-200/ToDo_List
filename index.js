// Step 1 : npm init -y
// Step 2: use "type":"module" in package.json
// Step 3: npm i express ejs body-parser
// Step 4: Use express.static and the urlencoded
// Step 5: Listen to the port. Set routing of the / and the /submit pages 

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let tasklist = [];
let taskdefinitionlist = [];
let editIndex = -1;

app.get("/", (req, res) => {
    res.render("index.ejs", {
        tasklist: tasklist,
        taskdefinitionlist: taskdefinitionlist,
        editTask: "",
        editTaskDefinition: "",
        editIndex: -1
    });
});

app.post("/submit", (req, res) => {
    const task = req.body.task;
    const taskDefinition = req.body.taskdefinition;
    
    if (req.body.editIndex && req.body.editIndex !== "-1") {
        // Editing an existing task
        const index = parseInt(req.body.editIndex);
        tasklist[index] = task;
        taskdefinitionlist[index] = taskDefinition;
    } else {
        // Adding a new task
        tasklist.push(task);
        taskdefinitionlist.push(taskDefinition);
    }
    
    res.render("index.ejs", {
        tasklist: tasklist,
        taskdefinitionlist: taskdefinitionlist,
        editTask: "",
        editTaskDefinition: "",
        editIndex: -1
    });
});

app.post("/edit", (req, res) => {
    const index = parseInt(req.body.indexe);
    const editTask = tasklist[index];
    const editTaskDefinition = taskdefinitionlist[index];
    
    res.render("index.ejs", {
        tasklist: tasklist,
        taskdefinitionlist: taskdefinitionlist,
        editTask: editTask,
        editTaskDefinition: editTaskDefinition,
        editIndex: index
    });
});

app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index);
    
    if (index >= 0 && index < tasklist.length) {
        tasklist.splice(index, 1);
        taskdefinitionlist.splice(index, 1);
    }
    
    res.render("index.ejs", {
        tasklist: tasklist,
        taskdefinitionlist: taskdefinitionlist,
        editTask: "",
        editTaskDefinition: "",
        editIndex: -1
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
