
/**
 * Module dependencies.
 */
var prismic = require('prismic-nodejs');
var app = require('./config');
var configuration = require('./prismic-configuration');
var PORT = app.get('port');

/**
* Start the server
*/
app.listen(PORT, function() {
  console.log('Point your browser to http://localhost:' + PORT);
});

/**
* Middleware to connect to the prismic.io API
*/
app.use((req, res, next) => {
  prismic.api(configuration.apiEndpoint, {accessToken: configuration.accessToken, req})
    .then(api => {
      req.prismic = {api};
      res.locals.ctx = {
        endpoint: configuration.apiEndpoint,
        linkResolver: configuration.linkResolver
      };
      next();
    }).catch(err => {
      if (err.status === 404) {
        res.status(404).send("There was a problem connecting to your API, please check your configuration file for errors.");
      } else {
        res.status(500).send("Error 500: " + err.message);
      }
    });
});


/**
* Preconfigured prismic preview
*/
app.get('/preview', (req, res) =>
  prismic.preview(req.prismic.api, configuration.linkResolver, req, res)
);


/**
* Route for blog homepage
*/
app.get(['/', '/blog'], (req, res) =>

  // Query the homepage
  req.prismic.api.getSingle("bloghome").then(bloghome => {

    // If a document is returned...
    if(bloghome) {

      var queryOptions = {
        page: req.params.p || '1',
        orderings: '[my.post.date desc]'
      };

      // Query the posts
      return req.prismic.api.query(
        prismic.Predicates.at("document.type", "post"),
        queryOptions
      ).then(function(response) {

        // Render the blog homepage
        res.render('bloghome', {
          bloghome,
          posts: response.results
        });
      });

    } else {
      // If a bloghome document is not returned, give an error
      res.status(404).send('Not found');
    }
  })
);


/**
* Route for blog posts
*/
app.get('/blog/:uid', (req, res) => {

  // Define the uid from the url
  var uid = req.params.uid;

  // Query the post by its uid
  req.prismic.api.getByUID('post', uid).then(post => {

    if(post) {
      // If a document is returned, render the post
      res.render('post', {post: post});
    } else {
      // Else give an error
      res.status(404).send('Not found');
    }
  });
});
