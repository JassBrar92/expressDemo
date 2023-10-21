const Joi=require('joi');
const express=require('express');
const logger=require('./logging');
const app=express();
//built-in middleware functions
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));  //use to put static content like images, text files 
app.use(express.json());
//custom middleware functions
app.use(logger);
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
  res.send(courses);
});
app.get('/api/courses/:id',(req,res)=>{
  //route parameter
  //res.send((req.params.id));
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) { return res.status(404).send("course was  not found");}
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
// http post request
app.post('/api/courses',(req,res)=>{
   //checking input validation
  //Object destructing
  const {error}=courseVaidation(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  const course={
    id:courses.length+1,
    name:req.body.name
  }
  courses.push(course);
  res.send(course);
});
//http put request
app.put('/api/courses/:id',(req,res)=>{
  //checking course id is valid or not
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send("Course id is invalid");
  //checking input validation
  //Object destructing
  const {error}=courseVaidation(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  //updating course object
   course.courseName=req.body.name;
   res.send(course);
  
});
//input validation function
function courseVaidation(course){
 const schema={
  name:Joi.string().min(3).required()
 }
 return Joi.validate(course,schema);
}
// http delete request
app.delete('/api/courses/:id',(req,res)=>{
  // checking id is valid or not
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('course id is invalid');
  //delete course
  const index=courses.indexOf(course);
  courses.splice(index,1);
  //sending deleted course to client
  res.send(course);
});
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on ${port} ...`));