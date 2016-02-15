var Prismic = require('express-prismic').Prismic,
    configuration = require('./prismic-configuration').Configuration;

exports.bloghome = function(req, res) {

  var p = Prismic.withContext(req, res);
  p.queryFirst('[[:d = at(document.type, "bloghome")]]', function (err, bloghome) {
    if (err) { configuration.onPrismicError(err, req, res); return; }
    if (bloghome) {
      var page = currentPage(req);
      var options = {
        'page' : page,
        'orderings' :'[my.post.date desc]'
      };
      p.query('[[:d = at(document.type, "post")]]', options, function (err, response) {
        if (err) { configuration.onPrismicError(err, req, response); return; }
        res.render('bloghome', {
          'bloghome' : bloghome,
          'posts' : response.results
        });
      });
    } else {
      res.status(404)
        .send('Not found');
    }
  });
};

exports.post = function(req, res) {

  var uid = req.params.uid;

  var p = Prismic.withContext(req, res);
  p.getByUID('post', uid, function then(err, post) {
    if (post) {
      res.render('post', {
        'post': post
      });
    } else {
      res.status(404)
        .send('Not found');
    }
  });
};

function currentPage(request) {
  return request.params.p || '1';
}
