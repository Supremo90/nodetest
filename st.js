const express = require('express'); //Richiesta modulo
let ejs = require('ejs'); // Richiesta ejs
const mongoose = require('mongoose');
const Blog = require('./models/blogs');


// express app
const app = express();
//registra il motore di visualizzazione (View engine)

//Connect to database Mongodb
const dbURI = "mongodb+srv://mongotest:test1234@mongotest.p8f87.mongodb.net/mongotest?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

app.set('view engine','ejs'); // e' una specie di contenitore con valore

app.listen(3002);



//Middleware
/*app.use(function (req, res, next) { //next per passare alla funzione successiva senza che blocchi il brro
  console.log('Path:', req.path);
  console.log('method!', req.method);
  console.log('Host!', req.hostname);
  next();
});*/

//Middleware static
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));



// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.render('index', {title: 'Homefg', base:['geddy', 'neil', 'alex'], number : 80 });
  });

  app.use(function (req, res, next) { //next per passare alla funzione successiva senza che blocchi il brro
    console.log("Next middleware");
    next();
  });

  app.get('/about', function(req, res) {
      res.redirect('/random');//serve per indirizzare a pagina specifica
  });
  
  app.get('/random', function (req, res) {
    res.render('about');
  });





  // Per ottenere tutti i file
  app.get('/blogs', function(req, res) {
    Blog.find().sort({createdAt:-1}) //serve per mostare i dati del database mostrarli in pagina
    .then((result) => {
      res.render('blogs', {title: 'Blogs All', number : 80, blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
  });


  app.post('/blogs', function (req, res) {
    const blog = new Blog(req.body);
    blog.save() //serve per salvare il modello nel database
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
  });

  app.get('/blogs/:id', function (req, res) { //non è un vero id ma falso perchè che ci sono 2 punti
    const id = req.params.id;
    console.log(id);//serve per vedere l'id o quello che sia
    Blog.findById(id) //serve per trovare un determinato file e mostrarli in pagina
    .then((result) => {
      res.render('single', {title: 'Post Single', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
  });





  app.get('/create', function (req, res) {
      res.render('create');
    });

  app.get('/test', function (req, res) {
    res.render('about');
  });

  //404 page
  app.use((req,res) => { // in caso di indirizzo nullo
    res.status(404).render('404');
  });