const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = (process.env.PORT || 3000);

var app = express();

hbs.registerPartials(__dirname+'/views/partials');                     //To set path of partials
app.set('view engine','hbs');                         

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n',(err) => {

		if(err){
			console.log('Something Went Wrong!');
		}
	});
	next();

});

/*app.use((req,res,next)=>{

	res.render('maintainance.hbs');

});
*/
app.use(express.static(__dirname+ '/public'));                          //to use middleware inside express


hbs.registerHelper('getYear',() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();

});

app.get('/', (req,res) => {

	res.render('home.hbs',{
	
		pageTitle:'Home Page',
		welcomeMessage:'Welcome! to the Website',
	
	});

});

app.get('/about',(req,res) => {

	res.render('about.hbs',{
	
		pageTitle:'About Page',

	});

});

app.get('/bad',(req,res) => {

	res.send({
	
		errorMessage:'bad request'
	
	});

});
app.get('/help',(req,res) => {

	//res.render();

});


app.listen(port,()=>{
	
	console.log(`server is start at port ${port}`);

});
