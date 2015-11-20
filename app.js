
/**
 * Module dependencies.
 */
var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    http = require('http'),
    path = require('path'),
    prismic = require('express-prismic').Prismic,
    configuration = require('./prismic-configuration').Configuration;

var app = express();

app.locals.general = require('./includes/general')

// Prismic.io configuration

prismic.init(configuration);


// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon("public/images/punch.png"));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('1234'));
app.use(session({secret: '1234', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler());

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send("404 not found");
  } else {
    res.status(500).send("Error 500: " + err.message);
  }
}

// Routes

app.route('/blog/search').get(function(req, res) {
  var p = prismic.withContext(req, res);
  var terms = req.query.terms;
  p.query([
      prismic.Predicates.at("document.type", "post-slices"),
      prismic.Predicates.fulltext("document", terms)
    ],
    { pageSize : 10 },
    function(err, postsContent) {
      if(!postsContent) {
        res.status(404).send("404 not found");
      } else {
        res.render('index', {
          postContent: postsContent.results[0]
        });
      }
    }
  );
});

app.route('/preview').get(prismic.preview);

var PORT = app.get('port');

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});
