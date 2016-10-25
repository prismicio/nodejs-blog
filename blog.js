var prismic = require('prismic-nodejs');
var configuration = require('./prismic-configuration');

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

exports.bloghome = function(req, res) {
  api(req, res).then(function(api) {
    return api.query(prismic.Predicates.at("document.type", "bloghome"));
  }).then(function(bloghome) {
    if(bloghome.results[0]) {
      var page = currentPage(req);
      var options = {
        'page' : page,
        'orderings' :'[my.post.date desc]'
      };
      api(req, res).then(function(api) {
        return api.query(prismic.Predicates.at("document.type", "post"), options);
      }).then(function(response) {
        res.render('bloghome', {
          'bloghome' : bloghome.results[0],
          'posts' : response.results
        });
      });
    } else {
      res.status(404)
        .send('Not found');
    }
  }).catch(function(err) {
    handleError(err, req, res);
  });
};

exports.post = function(req, res) {
  var uid = req.params.uid;
  api(req, res).then(function(api) {
    return api.getByUID('post', uid);
  }).then(function(post) {
    if(post) {
      res.render('post', {
        'post': post
      });
    } else {
      res.status(404)
        .send('Not found');
    }
  }).catch(function(err) {
    handleError(err, req, res);
  });
};

function currentPage(request) {
  return request.params.p || '1';
}
