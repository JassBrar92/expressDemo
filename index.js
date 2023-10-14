const express=require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app=express();
const courses=[
  {
    id:1,
    courseName:"Math"
  },
  {
    id:2,
    courseName:"Science"
  },
  {
    id:3,
    courseName:"History"
  }
];
app.get('/',(req,res)=>{
  res.send("hii world");
});
app.get('/api/courses',(req,res)=>{
  res.send(["Math","Science","History"]);
});
app.get('/api/course/:id',(req,res)=>{
  //route parameter
  //res.send((req.params.id));
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) {res.status(404).send("course was  not found");}
  res.send(course);

});
//more than one route parameter
app.get('/api/courses/:year/:month',(req,res)=>{
  res.send(req.params.year);
  res.send(req.params);
});
// query string  parameter
app.get('/api/post/:year/:month',(req,res)=>{
  res.send(req.query);
});
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on ${port} ...`));