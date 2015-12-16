var http = require('http');
var url = require('url');
var mysql = require('mysql');
var express = require('express');
var util = require('util');
var math = require('mathjs');
var app = express();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'rnaseq'
});
connection.connect();
