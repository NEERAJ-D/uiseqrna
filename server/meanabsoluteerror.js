//mean absolute error
app.get('/rnaseq/home/measures/mae',function(req,res){
for(var propName in req.query)
{if(req.query.hasOwnProperty(propName)){console.log(propName,req.query[propName]);}
if(propName == 'xaxis'){console.log('the x values are  '+ req.query[propName]);xaxis = req.query[propName];}
if(propName == 'yaxis'){console.log('the y-values are '+req.query[propName]);yaxis = req.query[propName];}
if(propName == 'type'){console.log('The table name::'+req.query[propName]);tablename = req.query[propName];}
if(propName == 'pid'){pid = req.query[propName];}}
res.writeHead(200,{"Content-Type":"application/text","Access-Control-Allow-Origin":"*"});
//mean absolute error
console.log('mean absolute error');
var sqlmae = 'select ((1/count('+tablename+'.'+xaxis+')) * sum(abs('+tablename+'.'+xaxis+' - truth.'+yaxis+'))) as meanabsoluteerror from '+tablename+',truth where '+tablename+'.'+pid+' = truth.Name';
var queryexec = connection.query(sqlmae, [tablename], function(err,rows,fields) {
console.log(queryexec.sql);
//console.log(rows[0].meanabsoluteerror);
mae = rows[0].meanabsoluteerror;
console.log(mae);
res.end(JSON.stringify(mae));
});
});
