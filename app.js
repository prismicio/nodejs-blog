"use strict";

/**
 * Module dependencies.
 */
import app from './config.js';
import createClient from './prismic-configuration.js';
import  * as prismicH from '@prismicio/helpers';
import UIhelpers from './includes/UIhelpers.js';
import asyncHandler from './utils/async-handler.js';

const route = app();

const PORT = route.get('port');



route.listen(PORT, () => {
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to enables Previews
const prismicAutoPreviewsMiddleware = (req, _res, next) => {
  const client = createClient(req);
  client.enableAutoPreviewsFromReq(req);
  next();
};

route.use(prismicAutoPreviewsMiddleware);

// Middleware to connect to inject prismic context
route.use((req, res, next) => {
  res.locals.ctx = {
    prismicH
  };
  // Add UI helpers to access them in templates
  res.locals.UIhelpers = UIhelpers;
  next();
});


/*
 * -------------- Routes --------------
 */


/**
* Route for Previews
*/
route.get('/preview', asyncHandler(async(req, res, next) => {
  const client = createClient(req);
  const redirectUrl = await client.resolvePreviewURL({
  })
  console.log("redirecturl is", redirectUrl)
  res.redirect(302, redirectUrl);
  next();
}));




/**
* Route for blog homepage
*/
route.get(['/','/blog'], asyncHandler(async(req, res, next) => {
  const client = createClient(req)
  const bloghome = await client.getSingle("blog_home")
  // If a document is returned...
  if (bloghome) {
    const response = await client.getByType('post', {
      page: req.params.p || '1',
      orderings: {
        field: 'my.post.date',
        direction: 'desc'
      }
    });
    if (response) { 
    // Render the blog homepage
    res.render('bloghome', {
      bloghome,
      posts : response.results
    });
  } 
  } else {
    // If a bloghome document is not returned, display the 404 page
    res.status(404).render("./error_handlers/404");
  }
  next();
}));


/**
* Route for blog post
*/
route.get('/blog/:uid', asyncHandler(async(req, res, next) => {
  // Define the uid from the url
  const uid = req.params.uid;
  const client = createClient(req)
  // Query the post by its uid
  const post = await client.getByUID('post', uid)
  // console.log("postdoc is", postdoc.data.body)
    if (post) {
      // If a document is returned, render the post
      res.render('post', { post });
      
    // Else display the 404 page
    } else {
      res.status(404).render("./error_handlers/404");
    }
    next();
  }));


route.get('*', asyncHandler(async(req, res, next) => {
  res.status(404).render("./error_handlers/404");
}));