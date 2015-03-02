var express          = require('express'),
    engine           = require('ejs-locals'),
    bodyParser       = require('body-parser'),
    expressValidator = require('express-validator'),
    http             = require('http'),
    path             = require('path'),
    _                = require('lodash'),

    app = express();

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {
  layout: false
});
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(express.static('public'));

app.get('/', function(req, res) {

  res.render('index' );
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
