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


app.get('/rnaseq/home/stats',function(req,res){

var tablename;

for(var propName in req.query)
{
if(req.query.hasOwnProperty(propName))
{
console.log(propName,req.query[propName]);
}
if(propName == 'type')
{tablename = req.query[propName];}
}

var sqlstmt = 'select * from '+tablename;
var queryexec = connection.query(sqlstmt,  function(err,rows,fields) {
console.log(queryexec.sql);
//console.log(rows);
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
res.end(JSON.stringify(rows));
});
});


//SeqNum - truth vs NumReads sailfish , est_counts kallisto, expected_count rsem_quant
app.get('/rnaseq/home/comparison/estimatedcount',function(req,res){
var sqlstmt = 'select truth.Name,truth.SeqNum/2,sailfish.NumReads,kallisto.est_counts,rsem_quant.expected_count from truth,sailfish,kallisto,rsem_quant where truth.Name = sailfish.Name and truth.Name = kallisto.target_id and truth.Name = rsem_quant.transcript_id';
var queryexec = connection.query(sqlstmt,  function(err,rows,fields) {
console.log(queryexec.sql);
//console.log(rows);
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
res.end(JSON.stringify(rows));
});
});


//SeqNum - truth vs NumReads sailfish , est_counts kallisto, expected_count rsem_quant
app.get('/rnaseq/home/comparison/TPM',function(req,res){
var sqlstmt = 'select truth.Name,truth.LibFrac,sailfish.TPM as sailfishTPM,kallisto.TPM as kallistoTPM,rsem_quant.TPM as rsemTPM from truth,sailfish,kallisto,rsem_quant where truth.Name = sailfish.Name and truth.Name = kallisto.target_id and truth.Name = rsem_quant.transcript_id';
var queryexec = connection.query(sqlstmt,  function(err,rows,fields) {
console.log(queryexec.sql);
console.log(rows);
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
res.end(JSON.stringify(rows));
});
});
