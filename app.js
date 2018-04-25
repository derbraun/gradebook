"use strict";

const express = require('express');
const bodyParser = require('body-parser');

//Setting app to use express
const app = express();

//Setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static('public'));

//Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

//bcrypt setup
let bcrypt = require('bcryptjs');
const saltRounds = 10;


//Allows a user to login
app.post('/api/login', (req, res) => {

    // Check that the request includes all the necessary information, and return an error if not.
    if (!req.body.username || !req.body.password)
        return res.status(400).send();

    //Look in the database for a user with the same username as the one being requested. If no such user exists, return a 403 error code.
    knex('users').where('username',req.body.username).first().then(user => {
        if (user === undefined) {
            res.status(403).send("Invalid credentials");
            throw new Error('abort');
        }
        return [bcrypt.compare(req.body.password, user.hash),user];

        //Compare the hash in the user's database entry with the hash of the password they supplied. If they match, return 200. Otherwise, return 403.
    }).spread((result,user) => {
        if (result)
            res.status(200).json({user:user});
        else
            res.status(403).send("Invalid credentials");
        return;

        //If any other error occurs, return 500.
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});


//Registration
app.post('/api/users', (req, res) => {

    //Check that the request includes all the necessary information, and return an error if not.
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
        return res.status(400).send();

    //Check if a user already exists with the given email address, and return an error if so.
    knex('users').where('email',req.body.email).first().then(user => {
        if (user !== undefined) {
            res.status(403).send("Email address already exists");
            throw new Error('abort');
        }
        return knex('users').where('username',req.body.username).first();

        //Check if a user already exists with the given username, and return an error if so.
    }).then(user => {
        if (user !== undefined) {
            res.status(409).send("User name already exists");
            throw new Error('abort');
        }

        //Hash the user's password.
        return bcrypt.hash(req.body.password, saltRounds);

        // Insert a record for the new user in the database.
    }).then(hash => {
        return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username,
            name:req.body.name, role: 'user'});

        // Find the record of the new user in the database.
    }).then(ids => {
        return knex('users').where('id',ids[0]).first();

        // Return 200.
    }).then(user => {
        res.status(200).json({user:user});
        return;

        //All other errors are 500
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});

//Get list of stored grades
app.get('/api/grades', (req, res) => {


    //Join of student grades where Student ID = SID
    knex.raw('SELECT students.student, grades.desc, grades.grade FROM ((students ' +
        'INNER JOIN studentGrade ON students.id = studentGrade.sid)' +
        'INNER JOIN grades ON grades.id = studentGrade.gid)').then(grades => {

        res.status(200).json({grades:grades});
    }).catch(error =>{
        res.status(500).json({error});
    });

    //Send status
});


//Add a new Grade
app.post('/api/grades', (req, res) => {
    //Set up Grade

    console.log("Server Add grades");
    let record = {student:req.body.student, grade:req.body.grade, desc:req.body.desc};
    let gid;
    let sid;

    console.log(record.student);

    //Store grade in Grades table and save id
    console.log("Inserting Grade");

    knex('grades').insert({grade: record.grade, desc: record.desc}).then(ids => {
        console.log("Looking up GID and SID");

        gid = knex('grades').where('id', ids[0]).select('id');
        return gid;
    }).then(id => {
        sid = knex('students').where('student', record.student).select('id');
        return sid;

    }).then(rows =>{

        if(rows.length === 0) {
            console.log("No Student found. Adding Student");

            knex('students').insert({student: record.student}).then( function (result) {
                res.json({ success: true, message: 'ok' });     // respond back to request
                sid = knex('students').where('student', record.student).select('id');
            });

            return sid;
        }

    }).then(student => {
        console.log('Storing in studentGrade');

        return knex('studentGrade').insert({sid: sid, gid: gid});


    }).then(record => {
        res.status(200).json({record:record});

        //All other errors are 500
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});





app.listen(3000, () => console.log('Creative Server listening on port 3000'));
