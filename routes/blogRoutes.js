const express = require('express'); //Richiesta modulo


//Middleware static
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));









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