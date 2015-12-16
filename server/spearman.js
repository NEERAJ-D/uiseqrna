//spearman coefficient caluclated
app.get('/rnaseq/home/measures/spearman',function(req,res){
for(var propName in req.query)
{if(req.query.hasOwnProperty(propName)){console.log(propName,req.query[propName]);}
if(propName == 'xaxis'){console.log('the x values are  '+ req.query[propName]);xaxis = req.query[propName];}
if(propName == 'yaxis'){console.log('the y-values are '+req.query[propName]);yaxis = req.query[propName];}
if(propName == 'type'){console.log('The table name::'+req.query[propName]);tablename = req.query[propName];}
if(propName == 'pid'){pid = req.query[propName];}}
res.writeHead(200,{"Content-Type":"application/text","Access-Control-Allow-Origin":"*"});
console.log('spearman corelation');
var rho;var sum = 0;var n = 86090;
var sqlspear = 'select truth.'+yaxis+' as trutht ,'+tablename+'.'+xaxis+' as tablet from truth,'+tablename +' where truth.Name = '+tablename+'.'+pid+' order by truth.'+yaxis;
var rho=0.00;
var querysp = connection.query(sqlspear,[tablename],function(err,rows,fields)
{console.log(querysp.sql);
for(var i=0;i < rows.length;i++){
//console.log(rows[i].tablet,rows[i].trutht);
if((rows[i].trutht - rows[i].tablet) < 0)
sum = sum + rows[i].tablet - rows[i].trutht;
else
sum = sum + (rows[i].trutht - rows[i].tablet);
}
rho = 1 - ((6 *(sum * sum))/n * ((n*n)-1));
//console.log(rows);});
console.log(rho);
res.end(JSON.stringify(rho));
console.log("end of execution");
});
});
