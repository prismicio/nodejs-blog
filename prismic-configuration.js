exports.Configuration = {

  apiEndpoint: 'https://nodejsblogpost.prismic.io/api',

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
      var date = doc.getDate('post.date'),
          year = date ? date.getUTCFullYear() : '0',
          month = date.getMonth().toString(),
          monthPadded = date ? (month.length == 1 ? ('0' + month) : month) : '0',
          day = date.getDay().toString(),
          dayPadded  = date ? (day.length == 1 ? ('0' + day) : day) : '0';

      return '/blog/' + year + '/' +  monthPadded + '/' + dayPadded + '/' + encodeURIComponent(doc.uid);
    }

    return '/';
  },
  onPrismicError: function(err, req, res) {
    res.status(500)
      .send("Error 500: " + err.message);
  }
 
};
