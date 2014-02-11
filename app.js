var express = require('express'),
swig = require('swig'),
mailer = require('express-mailer'),
path = require('path'),
app = express();


app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);

app.set('views', __dirname+'/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('index');
});


app.post('/contact', function(req, res, next){
  mailer.extend(app, {
    from: req.body.email,
    host: 'smtp.free.fr',
    secureConnection: false,
    port: 25,
    transportMethod: 'SMTP'
  });

  app.mailer.send('email', {
    to: 'ton@email.com',
    subject: req.body.subject,
    message: req.body.message
  }, function(err){
    if(err){
      console.log('On a une erreur!');return;
    }
    res.send('Email envoyé');
  });
});

app.listen(3000);
console.log('App is running');