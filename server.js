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


app.get('/rnaseq/home/scatter',function(req,res){
var xaxis;
var yaxis;
var tablename;
for(var propName in req.query)
{
if(req.query.hasOwnProperty(propName))
{
console.log(propName,req.query[propName]);
}
if(propName == 'xaxis')
{xaxis = req.query[propName];}
if(propName == 'yaxis')
{yaxis = req.query[propName];}
if(propName == 'type')
{tablename = req.query[propName];}
}
var sqlstmt = 'select min(??) as initialXValue , min(??) as initialValue,max(??) as finalXValue, max(??) as finalValue from ??';
var queryexec = connection.query(sqlstmt, [xaxis,yaxis,xaxis,yaxis,tablename], function(err,rows,fields) {
console.log(queryexec.sql);
//console.log(rows);
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
res.end(JSON.stringify(rows));
});
});


app.get('/rnaseq/search',function(req,res){
var field;
var tablename;
var field;
var value;
for(var propName in req.query)
{
if(req.query.hasOwnProperty(propName))
{
console.log(propName,req.query[propName]);
}
if(propName == 'field')
{
console.log('field to be searched  '+ req.query[propName]);
field = req.query[propName];
}
if(propName == 'value')
{
console.log('Searching the value'+ req.query[propName]);
value = req.query[propName];
}
if(propName == 'type')
{
console.log('The table name'+req.query[propName]);
tablename = req.query[propName];
}
}
console.log('Searching...');
var sqlstmt = 'select * from ?? where gccontent <> ""';
var queryexec = connection.query(sqlstmt, [tablename], function(err,rows,fields) {
console.log(queryexec.sql);
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
res.end(JSON.stringify( rows));
});
});


//pearson-corelation plot
app.get('/rnaseq/home/correlation/plot',function(req,res){
var xaxis;
var yaxis;
var tablename;
var pid;
for(var propName in req.query)
{
if(req.query.hasOwnProperty(propName))
{console.log(propName,req.query[propName]);}
if(propName == 'xaxis')
{console.log('the x values are  '+ req.query[propName]);xaxis = req.query[propName];}
if(propName == 'yaxis')
{console.log('the y-values are '+req.query[propName]);yaxis = req.query[propName];}
if(propName == 'type')
{console.log('The table name::'+req.query[propName]);tablename = req.query[propName];}
if(propName == 'pid')
{pid = req.query[propName];}
}
var count;
var truth = 'truth';
var sqlstmt = 'select truth.Name,'+tablename+'.'+xaxis+','+truth+'.'+yaxis+' from '+tablename+','+truth+' where '+truth+'.Name='+tablename+'.'+pid+' order by '+tablename+'.'+xaxis;
var countquery  = connection.query(sqlstmt,[tablename,truth,tablename,tablename,pid],function(err,rows,fields){
console.log(countquery.sql);
console.log(rows);
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
res.end(JSON.stringify(rows));
});
});


//pearson coefficient caluclated
app.get('/rnaseq/home/measures/pearson',function(req,res){
var pearsonr=0.00;
var examplenum = 0.0026659337159251418;
for(var propName in req.query)
{if(req.query.hasOwnProperty(propName))
{console.log(propName,req.query[propName]);}
if(propName == 'xaxis')
{console.log('the x values are  '+ req.query[propName]);xaxis = req.query[propName];}
if(propName == 'yaxis')
{console.log('the y-values are '+req.query[propName]);yaxis = req.query[propName];}
if(propName == 'type'){console.log('The table name::'+req.query[propName]);tablename = req.query[propName];}
if(propName == 'pid'){pid = req.query[propName];}
}
res.writeHead(200,{"Content-Type":"application/text","Access-Control-Allow-Origin":"*"});
console.log('pearson');
var sqlpearson  = 'select ((count('+tablename+'.'+xaxis+')*(sum('+tablename+'.'+xaxis+' * truth.'+yaxis+')))-(sum('+tablename+'.'+xaxis+') * sum(truth.'+yaxis +')))/ sqrt((count('+tablename+'.'+xaxis+') * sum(pow('+tablename+'.'+xaxis+',2)) - pow(sum(truth.'+yaxis+'),2))* (count(truth.'+yaxis+')* sum(pow(truth.'+yaxis+',2)) - pow(sum(truth.'+yaxis+'),2)) ) as pearsonr from '+tablename+',truth where truth.Name = '+tablename+'.'+pid;
var queryexec = connection.query(sqlpearson, [tablename], function(err,rows,fields) {
console.log(queryexec.sql);
console.log(rows[0].pearsonr);
pearsonr = rows[0].pearsonr;
res.end(JSON.stringify(pearsonr));
console.log("end of execution");
});
});
