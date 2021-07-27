var express = require('express');
var mongodb = require('mongodb');

const SERVER_PORT = 27017; //give your port
var user = 'w_li1';
var password = 'A00445457';
var database = 'w_li';

//These should not change, unless the server spec changes
//var host = '127.0.0.1';
var host = '192.168.75.129';
var port = '27017'; // Default MongoDB port for all the students

// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' +
    host + ':' + port + '/' + database;
//will create: 
// mongodb://dk_govindaraj:A00421724@127.0.0.1:27017/dk_govindaraj

//now connect to the db
mongodb.connect(connectionString, function (error, db) {

    if (error) {
        throw error;
    }//end if

    /**
    *  code if successfully accessing the db!!
    */
    console.log("login mongo successfully")

});




var app = express();

app.get('/test', function (req, res) {
    res.send("testtest");
});

app.listen(3000);

console.log('listen 3000');