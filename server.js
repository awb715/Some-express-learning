const express = require('express');
const hbs= require('hbs');
const fs =require('fs');

const port = process.env.PORT || 3000; //Environment variabes in terminal. env.PORT is hrokue connection to server
var app = express();

hbs.registerPartials(__dirname + '/views/partials')//passes on partial components of html templates using {{}}
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


//this runs everytime the server is clicked on (links etc), its Called middle wear. The request (req) is sent on each click and we pull data from the req object in the log variable. Using fs module we then append to server.log the log variable on each request.
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    // \n is a line break
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('unable to append to log')
        }
    });
    
    next();//function wont run without next
});

//app.use((req, res,next)=>{
//    res.render('mait.hbs');
//});

hbs.registerHelper('getYear',()=>{
    
return new Date().getFullYear();  //works wit curly braces for functions
});

hbs.registerHelper('scream',(text)=>{
    return text.toUpperCase();
 //works wit curly braces for functions
});




app.get('/',(req, res)=>{
   
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle:'Home Page',

        message:'NodeJS is cool'
        
    });
    
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        
        pageTitle:'About Page',

    });//renders template
});

app.get('/bad',(req,res)=>{
    res.send({
        error: 'Unable to fulfill request'
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        
        pageTitle:'Projects Page',
        message:'Check out my projects'

    });//renders template
});


app.listen(port, () =>{
    console.log(`Server.js is now up on ${port}`)
});

