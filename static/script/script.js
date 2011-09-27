(function() {
  var Leanshow;
  Leanshow = function() {
    var current, fixVerticalAlign, keyupHandler, locationChangeHandler, nextSlide, openPresenterView, presenterView, previewMode, previousSlide, refreshClasses, slides;
    slides = $('article');
    current = void 0;
    previewMode = void 0;
    presenterView = void 0;
    refreshClasses = function() {
      var currentSlide;
      currentSlide = $(slides[current]);
      slides.removeClass('before-prev after-next prev next current');
      currentSlide.addClass('current').prev().addClass('prev').prev().addClass('before-prev');
      currentSlide.next().addClass('next').next().addClass('after-next');
      if (previewMode) {
        $('body').addClass('preview');
      } else {
        $('body').removeClass('preview');
      }
    };
    previousSlide = function() {
      if (current > 0) {
        window.location.href = window.location.href.replace('#' + (current + 1), '#' + (--current + 1));
        refreshClasses();
      }
    };
    nextSlide = function() {
      if (current < slides.length - 1) {
        window.location.href = window.location.href.replace('#' + (current + 1), '#' + (++current + 1));
        refreshClasses();
      }
    };
    openPresenterView = function() {
      if (presenterView === void 0 || presenterView.closed) {
        presenterView = window.open(window.location.href.replace(/\d+$/, 'preview/' + (current + 1)), 'Presenter View');
      } else {
        presenterView.focus();
      }
    };
    keyupHandler = function(e) {
      switch (e.keyCode) {
        case 37:
          previousSlide();
          break;
        case 39:
          nextSlide();
          break;
        case 40:
          refreshClasses();
          break;
        case 80:
          if (e.altKey && e.ctrlKey) {
            openPresenterView();
          }
      }
    };
    locationChangeHandler = function(url) {
      current = window.location.href.match(/\d+$/);
      previewMode = window.location.href.match(/#preview/);
      if (current != null) {
        current = Number(current[0]) - 1;
        if (current < 0) {
          window.location.href = window.location.href.replace(current + 1, 1);
          current = 0;
        }
        if (current >= slides.length) {
          window.location.href = window.location.href.replace(current + 1, slides.length);
          current = slides.length - 1;
        }
      } else {
        current = 0;
        window.location.href = window.location.href + '#' + (current + 1);
      }
      if (presenterView != null) {
        presenterView.location.href = presenterView.location.href.replace(/\d+$/, current + 1);
      }
      refreshClasses();
    };
    fixVerticalAlign = function() {
      var detachedSlides;
      detachedSlides = slides.detach();
      detachedSlides.each(function() {
        return $(this).children().wrapAll('<div class="center">');
      });
      return detachedSlides.appendTo('body');
    };
    if (previewMode === void 0) {
      document.addEventListener('keyup', keyupHandler);
    } else {
      document.title = "Presenter View";
    }
    $(window).bind('hashchange', locationChangeHandler);
    fixVerticalAlign();
    locationChangeHandler();
  };
  $(function() {
    return Leanshow();
  });
}).call(this);
