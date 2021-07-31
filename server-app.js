var express = require('express');
var mongodb = require('mongodb').MongoClient;
var cors = require('cors')

//my port
const SERVER_PORT = 8128;
//var SERVER_URL = 'http://dev.cs.smu.ca:8128';
var SERVER_URL = 'http://localhost:8128';

// mongo user name
var user = 'w_li1';
// password
var password = 'A00445457';
// database
var database = 'w_li';

//mongo ip and port
//var host = '127.0.0.1';
var host = '192.168.75.129';
var port = '27017'; // Default MongoDB port for all the students

// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' +
    host + ':' + port + '/' + database;

//CORS Middleware, causes Express to allow Cross-Origin Requests
// Do NOT change anything here
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};



//set up the server variables
var app = express();
// add middleware for json interpret and cros domain 
app.use(express.json());
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));





// save new university
app.post('/saveuniversity', function (req, res) {
    var university = req.body;
    console.log(university);
    mongodb.connect(connectionString, function (error, db) {

        if (error) {
            throw error;
        }//end if

        //connect to mongodb successfully
        var dbo = db.db(database);
        dbo.collection("university").insertOne(university, function (err, response) {
            if (err) throw err;
            console.log("1 document inserted");
            res.send(response);
            db.close();
        });

    });
});

// query list of university
app.get('/queryuniversitylist', function (req, res) {
    mongodb.connect(connectionString, function (error, db) {

        if (error) {
            throw error;
        }//end if

        var dbo = db.db(database);
        dbo.collection("university").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });

    });

});

// query university by name
app.get('/find/:name', function (req, res) {
    let universityName = req.params.name;
    var universityquery = { name: universityName };
    mongodb.connect(connectionString, function (error, db) {

        if (error) {
            throw error;
        }//end if

        var dbo = db.db(database);
        dbo.collection("university").find(universityquery).toArray(function (err, result) {
            if (err) throw err;
            if (result == null) {
                console.log("not find any university named " + universityName);
                res.send();
            } else {
                console.log(result);
                res.send(result);
            }

            db.close();
        });

    });

});

// delete university
app.post('/delete/:name', (req, res) => {
    let universityName = req.params.name;
    var universityquery = { name: universityName };
    mongodb.connect(connectionString, function (error, db) {

        if (error) {
            throw error;
        }//end if

        // access to mongodb successfully
        var dbo = db.db(database);

        dbo.collection("university").deleteOne(universityquery, function (err, obj) {
            if (err) throw err;
            if (obj.deletedCount < 1) {
                console.log("no university deleted");
                res.send("No university deleted, please check the university name.");
            } else {
                console.log("1 document deleted");
                res.send("1 university deleted");
            }

            db.close();
        });

    });

});


app.listen(SERVER_PORT);

console.log('listen ' + SERVER_PORT);