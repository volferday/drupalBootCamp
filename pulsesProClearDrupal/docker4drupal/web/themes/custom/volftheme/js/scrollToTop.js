(function ($, Drupal, once) {
  Drupal.behaviors.topBtnBehavior = {
    attach: function (context, settings) {
      once('topBtnBehavior', 'html', context).forEach(function (element) {
        $('<div class="scrollToTopBtn"></div>').appendTo('body')
        let btn = $('.scrollToTopBtn');
        $(window).scroll(function () {
          if ($(window).scrollTop() > 500) {
            btn.addClass('show');
          } else {
            btn.removeClass('show');
          }
        });

        btn.on('click', function (e) {
          e.preventDefault();
          $('html, body').animate({scrollTop: 0}, '300');
        });
      })
    }
  };
})(jQuery, Drupal, once);


