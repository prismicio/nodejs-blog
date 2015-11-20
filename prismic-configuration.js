exports.Configuration = {

  apiEndpoint: 'https://newinstancefdr.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function(doc, ctx) {
    if (doc.type == 'blog') {
      return '/blog';
    }
    if (doc.type == 'post') {
      return '/blog/' + encodeURIComponent(doc.uid);
    }

    return '/';
  },
  onPrismicError: function(err, req, res) {
    res.status(500)
      .send("Error 500: " + err.message);
  }
 
};
