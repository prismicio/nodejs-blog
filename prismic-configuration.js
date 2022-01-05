// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

export const repoName = 'your-repo-name'; // Fill in your repository name.
const endpoint = prismic.getEndpoint(repoName); // Format your endpoint.

export const client = prismic.createClient(endpoint, {
  // If your repo is private, add an access token.
  accessToken: '',
  fetch,

  // This defines how you will structure URL paths in your project.
  // Update the types to match the Custom Types in your project, and edit
  // the paths to match the routing in your project.
  routes: [
    {
      type: 'blog_home',
      path: '/',
    },
    {
      type: 'post',
      path: '/blog/:uid',
    },
  ],
});
