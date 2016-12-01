
/**
 * Module dependencies.
 */
var prismic = require('prismic-nodejs');
var app = require('./config');
var configuration = require('./prismic-configuration');
var PORT = app.get('port');
var blog = require('./blog');

// Start the server
app.listen(PORT, function() {
  console.log('Point your browser to http://localhost:' + PORT);
});

// Preview Route
app.route('/preview').get(blog.preview);

// Blog Homepage Route
app.route(['/', '/blog']).get(blog.bloghome);

// Blog Post Route
app.route('/blog/:uid').get(blog.post);