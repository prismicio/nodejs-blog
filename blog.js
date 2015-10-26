var Prismic = require('express-prismic').Prismic,
    configuration = require('./prismic-configuration').Configuration;


exports.post = function(req, res) {

  var uid = req.params['uid'];

  var p = Prismic.withContext(req, res);
  p.getByUID('post', uid, function then(err, post) {
    if (post) {
      res.render('post', {
        'post': post
      })
    } else {
      res.status(404)
          .send('Not found');
    }
  })
}


exports.bloghome = function(req, res) {
  Prismic.withContext(req, res, function then(error, ctx) {
    if (error) { configuration.onPrismicError(error, req, res); return; }
    var homeId = ctx.api.bookmarks["home"]
    var bloghomeId = ctx.api.bookmarks["bloghome"]

    if(bloghomeId == null) {
      req.status(404)
        .send('Not found');
    } else if (bloghomeId == homeId) {

      res.redirect('/');
    } else {
      var page = currentPage(req)
      var options = {
        'fetchLinks' : [
          'post.date',
          'category.name',
          'author.full_name',
          'author.first_name',
          'author.surname',
          'author.company'
        ],
        'page' : page,
        'orderings' :'[my.post.date desc]'
      }
      var p = Prismic.withContext(req, res);
      p.getByID(bloghomeId, function then(err, bloghome) {
        if (err) { configuration.onPrismicError(err, req, res); return; }
        if (bloghome) {
          p.query('[[:d = at(document.type, "post")]]', options, function then(err, response) {
            if (err) { configuration.onPrismicError(err, req, response); return; }
            res.render('bloghome', {
              'bloghome' : bloghome,
              'posts' :response.results
            })
          })
        } else {
          res.status(404)
            .send('Not found');
        }
      })
    }
  })
}

function currentPage(request) {
  var pageQuery = request.params['p'];
  if (pageQuery) {
    return pageQuery
  } else return '1';
}