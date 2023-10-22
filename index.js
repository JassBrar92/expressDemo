const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const config=require('config');
const helmet=require('helmet');
const morgan=require('morgan');
const Joi=require('joi');
const course=require('./router/courses');
const home=require('./router/home');
const express=require('express');
const logger=require('./middleware/logging');
const app=express();
//Templating engine
app.set('view engine','pug');
app.set('views','./views');
// use these methods to check which environement  our code is runnning  production environment or development environment
//console.log(process.env.NODE_ENV);  //it returns undefined if environment is not set
//console.log(app.get('env'));   // it returns by default development environment if environment is not set
//third party middleware functions
if(app.get('env')==='development'){
  app.use(morgan('tiny'));
  startupDebugger("morgan enabled...");    //debugging statement
}
// somewhere in the program there may be some database related statement
dbDebugger("connected to database....");
//configration
console.log(`Name : ${config.get('name')}`);
console.log(`Mail : ${config.get('mail.host')}`);
//console.log(`Password : ${config.get('mail.password')}`);
app.use(helmet());
//built-in middleware functions
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));  //use to put static content like images, text files 
app.use(express.json());
//custom middleware functions
app.use(logger);
app.use('/api/courses',course);
app.use('/',home);
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on ${port} ...`));