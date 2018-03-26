var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


"use strict";

var express = require('express');
var router = express.Router();

let grades = [];
let id = 0;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/grades', (req, res) => {
    console.log("router get called");
    res.send(grades);
});

router.post('/grades', (req, res) => {
    id++;
    let grade = {id:id, name:req.body.name, letter:req.body.grade};
    grades.push(grade);
    res.send(grade);
});


router.put('/grades/:id', (req,res) =>{
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

router.delete('/grades/:id', (req, res) => {
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


module.exports = router;
