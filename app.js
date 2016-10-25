
/**
 * Module dependencies.
 */
var prismic = require('prismic-nodejs');
var app = require('./config');
var configuration = require('./prismic-configuration');
var PORT = app.get('port');
var blog = require('./blog');

// Returns a Promise
function api(req, res) {
  // So we can use this information in the views
  res.locals.ctx = {
    endpoint: configuration.apiEndpoint,
    linkResolver: configuration.linkResolver
  };
  return prismic.api(configuration.apiEndpoint, {
    accessToken: configuration.accessToken,
    req: req
  });
}

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send("404 not found");
  } else {
    res.status(500).send("Error 500: " + err.message);
  }
}

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});

// Preview Route
app.route('/preview').get(function(req, res) {
  api(req, res).then(function(api) {
    return prismic.preview(api, configuration.linkResolver, req, res);
  }).catch(function(err) {
    handleError(err, req, res);
  });
});

// Blog Homepage Route
app.route(['/', '/blog']).get(blog.bloghome);

// Blog Post Route
app.route('/blog/:uid').get(blog.post);