(function($){

  // Footer links (next/previous)
  $(document).ready(function() {
    var viewportHeight =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var latestKnownScrollY = 0;
    var previousScrollY = 0;
    var ticking = false;
    var $footer = $('.blog-footer');
    var lastTransition = Date.now();

    if(window.disqium) {
      disqium.on('show', function() {
        $footer.removeClass('fade-in');
      }).on('close', function() {
        onScroll();
      });
    }

    function update() {
      var previousY = previousScrollY;
      var y = latestKnownScrollY;
      var scrollDown = y > previousY;
      var maxScrollHeight = document.body.scrollHeight - viewportHeight;
      var percent = (y * 100) / maxScrollHeight;
      var timeSinceLastTransition = (Date.now() - lastTransition) / 1000;
      if(timeSinceLastTransition > 0.6 || y == 0 || y == window.pageYOffset) {
        if((percent >= 80 && scrollDown) || (percent >= 6 && !scrollDown)) {
          $footer.addClass('fade-in');
        } else {
          $footer.removeClass('fade-in');
        }
        lastTransition = Date.now();
      }

      ticking = false;
    }

    function requestTick() {
      if(!ticking) {
        requestAnimationFrame(update);
      }
      ticking = true;
    }

    function onScroll() {
      previousScrollY = latestKnownScrollY;
      latestKnownScrollY = window.pageYOffset;
      requestTick();
    }

    if(document.body.scrollHeight >= (viewportHeight * 2)) {
      window.addEventListener('scroll', onScroll, false);
      onScroll();
    } else {
      $footer.addClass('fade-in');
    }

  });

})(jQuery);
