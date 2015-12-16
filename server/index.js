app.get('/rnaseq/home',function(req,res){
console.log('request received');
console.log(req.query);
var tablename;
var xaxis;
var yaxis;
var offset=0;
var range=1000;
var aggregate='false';
var transcriptid;
var transform = 'false';
for(var propName in req.query)
{
if(req.query.hasOwnProperty(propName))
{
console.log(propName,req.query[propName]);
}
if(propName == 'type')
{
console.log('Data shall be fetched from the '+ req.query[propName]  +' table');
tablename = req.query[propName];
if(tablename == 'sailfish')
transcriptid = 'Name';
else if(tablename == 'rsem')
transcriptid = 'transcript_id';
else if(tablename == 'kallisto')
transcriptid = 'target_id';
}
if(propName == 'xaxis')
{
xaxis = req.query[propName];
console.log('The x co-ordinate used shall be '+req.query[propName]);
}
if(propName == 'yaxis')
{
yaxis = req.query[propName];
console.log('The y co-ordinate used shall be '+req.query[propName]);
}

if(propName == 'transform')
{
console.log('the transform used for plotting will be ');
//transform = req.query[propName];
}

if(propName == 'offset')
{
offset = req.query[propName];
console.log('The offset used is '+req.query[propName]);
}

if(propName == 'range')
{
range = req.query[propName];
console.log('The range selected is '+req.query[propName]);
}

if(propName == 'aggregate')
{
aggregate = req.query[propName];
console.log('The aggregate selected is '+req.query[propName]);
}

if(propName == 'transcriptid')
{
transcriptid = req.query[propName];
}

if(propName == 'transform')
{
transform = req.query[propName];

}

}


if(aggregate == 'false')
{
console.log('xaxis selected is '+xaxis);
console.log('tablename selected is '+tablename);
console.log('transcript id'+transcriptid);
//var columns = [transcriptid,xaxis,yaxis];
var columns = [transcriptid,xaxis,yaxis];


//var sqlstatement = 'select '+ connection.escape(xaxis)+','+connection.escape(yaxis) +' from '+ connection.escape(tablename); //+'  where '+connection.escape(yaxis) + '<'+connection.escape(range);
//var queryexec = connection.query(sqlstatement,function(err,rows,fields){

//var sqlstmt = 'select ?? from ?? order by ?? limit '+connection.escape(offset) + ',' + connection.escape(range);
var sqlstmt;
if(transform == 'true')
{

sqlstmt = 'select ??,?? as ??,log(??) as ?? from ?? order by ?? limit '+offset+','+range;
var queryexec = connection.query(sqlstmt, [transcriptid,xaxis,xaxis,yaxis,yaxis,tablename,xaxis], function(err,rows,fields) {
console.log(queryexec.sql);
console.log(rows);
//console.log();
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
//res.end(rows);
//res.end('this is the end ');
res.end(JSON.stringify( rows));
});
}
else
{
sqlstmt = 'select ?? from ?? order by ?? limit '+offset+','+range;
var queryexec = connection.query(sqlstmt, [columns,tablename,xaxis], function(err,rows,fields) {
console.log(queryexec.sql);
console.log(rows);
//console.log();
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
//res.end(rows);
//res.end('this is the end ');
res.end(JSON.stringify( rows));
});
}
//var queryexec = connection.query(sqlstmt, [columns,tablename,xaxis], function(err,rows,fields) {
//console.log(queryexec.sql);
//console.log(rows);
//res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
//res.end(JSON.stringify( rows));
//});
}
else if(aggregate=='true')
{
console.log('xaxis selected is '+xaxis);
console.log('tablename selected is '+tablename);
var sqlstmt = 'select ??,count(??) as count from ?? group by ?? order by ?? limit '+offset+','+range;
var queryexec = connection.query(sqlstmt, [xaxis,xaxis,tablename,xaxis,xaxis], function(err,rows,fields) {
console.log(queryexec.sql);
console.log(rows);
res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
//res.end(rows);
//res.end('this is the end ');
res.end(JSON.stringify( rows));
});
}
});
