"use strict";

/**
 * Module dependencies.
 */
const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');
const app = require('./config');
const PrismicConfig = require('./prismic-configuration');
const PORT = app.get('port');
const UIhelpers = require('./includes/UIhelpers');
const asyncHandler = require ("./utils/async-handler");

app.listen(PORT, () => {
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to connect to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  
  // Add UI helpers to access them in templates
  res.locals.UIhelpers = UIhelpers;
  
  // Add PrismicDOM in locals to access them in templates
  res.locals.PrismicDOM = PrismicDOM;
  
  // Add the prismic.io API to the req
  Prismic.getApi(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

/*
 * -------------- Routes --------------
 */

/**
* Preconfigured prismic preview
*/
 // Prismic preview route
 app.get('/preview', asyncHandler(async (req, res, next) => {
  const { token, documentId } = req.query;
  if(token){
    try{
      const redirectUrl = (await req.prismic.api.getPreviewResolver(token, documentId).resolve(PrismicConfig.linkResolver, '/'));
      res.redirect(302, redirectUrl);
    }catch(e){
      res.status(500).send(`Error 500 in preview`);
    }
  }else{
    res.send(400, 'Missing token from querystring');
  }
  next();
}))


/**
* Route for blog homepage
*/
app.get(['/', '/blog'], (req, res) =>

  // Query the homepage
  req.prismic.api.getSingle("blog_home").then((bloghome) => {
    
    // If a document is returned...
    if (bloghome) {

      var queryOptions = {
        page: req.params.p || '1',
        orderings: '[my.post.date desc]'
      };

      // Query the posts
      req.prismic.api.query(
        Prismic.Predicates.at("document.type", "post"),
        queryOptions
      ).then(function(response) {
        
        // Render the blog homepage
        res.render('bloghome', {
          bloghome,
          posts : response.results
        });
      });

    } else {
      // If a bloghome document is not returned, display the 404 page
      res.status(404).render("./error_handlers/404");
    }
  })
);


/**
* Route for blog posts
*/
app.get('/blog/:uid', (req, res) => {

  // Define the uid from the url
  const uid = req.params.uid;

  // Query the post by its uid
  req.prismic.api.getByUID('post', uid).then(post => {

    if (post) {
      // If a document is returned, render the post
      res.render('post', { post });
      
    // Else display the 404 page
    } else {
      res.status(404).render("./error_handlers/404");
    }
  });
});
