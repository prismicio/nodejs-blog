'use strict';
/**
 * Module dependencies.
 */
import app from './config.js';
import { client, repoName } from './prismic-configuration.js';
import * as prismicH from '@prismicio/helpers';
import UIhelpers from './includes/UIhelpers.js';
import asyncHandler from './utils/async-handler.js';

const route = app();
const PORT = route.get('port');

route.listen(PORT, () => {
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to enables Previews
const prismicAutoPreviewsMiddleware = (req, _res, next) => {
  client.enableAutoPreviewsFromReq(req);
  next();
};
route.use(prismicAutoPreviewsMiddleware);

// Middleware to connect to inject prismic context
route.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
    repoName,
  };
  // Add UI helpers to access them in templates
  res.locals.UIhelpers = UIhelpers;
  next();
});

// Route for Previews
route.get(
  '/preview',
  asyncHandler(async (req, res, next) => {
    const redirectUrl = await client.resolvePreviewURL({ defaultURL: '/' });
    res.redirect(302, redirectUrl);
  })
);

// Route for blog homepage
route.get(
  ['/', '/blog'],
  asyncHandler(async (req, res, next) => {
    const bloghome = await client.getSingle('blog_home');
    const response = await client.getByType('post', {
      orderings: {
        field: 'my.post.date',
        direction: 'desc',
      },
    });
    res.render('bloghome', {
      bloghome,
      posts: response.results,
    });
  })
);

// Route for blog post
route.get(
  '/blog/:uid',
  asyncHandler(async (req, res, next) => {
    const uid = req.params.uid;
    const post = await client.getByUID('post', uid);
    res.render('post', { post });
  })
);

// 404 route for anything else
route.get('*', async (req, res, next) => {
  res.status(404).render('./error_handlers/404');
});
