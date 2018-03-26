"use strict";

var express = require('express');
var bodyParser = require('body-parser');

//Setting app to use express
var app = express();

//Setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));



//calls for server
let grades = [];
let id = 0;


app.get('/grades', (req, res) => {
    res.send(grades);
});

app.post('/grades', (req, res) => {
    id++;
    let grade = {id:id, name:req.body.name, letter:req.body.grade};
    grades.push(grade);
    res.send(grade);
});


app.put('/grades/:id', (req,res) =>{
    //Grab id from request and connect it to its grade
    let id = parseInt(req.params.id);
    let gradesMap = grades.map(grade => {return grade.id});
    let index = gradesMap.indexOf(id);
    let grade = grades[index];

    //setting grade values
    grade.name = req.body.name;
    grade.letter = req.body.letter;

    //handle drag and drop re-ordering
    if(req.body.orderChange){
        let indexTarget = gradesMap.indexOf(req.body.orderTarget);
        grades.splice(index,1);
        grades.splice(indexTarget,0,grade);
    }

    res.send(grade);
});

app.delete('/grades/:id', (req, res) => {
    //connect id to location in grades
    let id = parseInt(req.params.id);
    let removeIndex = grades.map(grade => {return grade.id; }).indexOf(id);

    if(removeIndex === -1){
        res.status(404).send("Sorry that record doesn't exist");
        return;
    }

    //remove from list
    grades.splice(removeIndex,1);
    res.sendStatus(200);
});


app.listen(8080, () => console.log('Creative Server listening on port 8080'));
