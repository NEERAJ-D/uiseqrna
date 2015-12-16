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
