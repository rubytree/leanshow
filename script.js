function LeanSlideshow() {
  var d = document,
      slides = d.getElementsByTagName('article'),
      current, previewMode, presenterView,
      old_orientatnion, orientatnion, wait_for_event=false;

      locationChangeHandler();

      function refreshClasses(){
        var current_class = slides[current].classList;

        for(var i = 0; i < slides.length; i++) {
          var classList = slides[i].classList;

          classList.remove('prev');
          classList.remove('next');
          classList.remove('current');

          if (i < current - 1){
            classList.add('before-prev');
            classList.remove('after-next');
          } else if (i > current + 1) {
            classList.add('after-next');
            classList.remove('before-prev');
          }
        }


        if (current > 0){
        var prev_class = slides[current - 1].classList;
          prev_class.add('prev');
          prev_class.remove('before-prev');
          prev_class.remove('current');
        } 

        if (current < slides.length-1) {
        var next_class = slides[current + 1].classList
          next_class.add('next');
          next_class.remove('after-next');
          next_class.remove('current');
        } 

        current_class.add('current');
        current_class.remove('next');
        current_class.remove('prev');
        
        if (previewMode) {
          document.body.classList.add('preview');
        } else {
          document.body.classList.remove('preview');
        }
      }

      function previousSlide() {
        if (current > 0) {
          window.location.href = window.location.href.replace('#'+(current+1), '#'+(--current+1));
          refreshClasses();
        }
      }

      function nextSlide() {
        if (current < slides.length-1) {
          window.location.href = window.location.href.replace('#'+(current+1), '#'+(++current+1));
          refreshClasses();
        }
      }

      function openPresenterView() {
        if (typeof presenterView === "undefined" || presenterView.closed) {
          presenterView = window.open(window.location.href.replace(/\d+$/, 'preview/'+(current+1)), 'Presenter View');
        }
      }

      function keyupHandler(e){
        switch(e.keyCode) {
          case 37:
            previousSlide();
            break;
          case 39:
            nextSlide();
            break;

          case 38:
            for (var i = 0; i < slides.length; i++) {
              slides[i].classList.add('current');
            };
            break;
          case 40:
            refreshClasses();
            break;
          case 80:
            if (e.altKey && e.ctrlKey) {
              openPresenterView();
            }
            break;
        }
      }

      function orientationHandler(e) {
        orientatnion = Math.floor(e.gamma);
        if(wait_for_event == false && (orientatnion > 5 || orientatnion < -5)) {
          old_orientatnion = orientatnion;
          wait_for_event = true;
          setTimeout(function(){
            if(orientatnion > 5 && old_orientatnion >= orientatnion) {
              nextSlide();
            } else if(orientatnion < 5 && old_orientatnion <= orientatnion) {
              previousSlide();
            }
            wait_for_event = false;
          },300);
        }
      }

      function locationChangeHandler(url) {
        current = window.location.href.match(/\d+$/);
        previewMode = window.location.href.match(/#preview/);

        if (current) {
          current = Number(current[0])-1;
          if(current < 0) {
            window.location.href = window.location.href.replace(current+1, 1)
            current = 0;
          }
          if (current >= slides.length) {
            window.location.href = window.location.href.replace(current+1, slides.length)
            current = slides.length-1;
          }
        } else {
          current = 0;
          window.location.href = window.location.href + '#' + (current + 1);
        }

        if (presenterView) {
          presenterView.location.href = presenterView.location.href.replace(/\d+$/, current+1);  
        }
        
        refreshClasses();

      }

      if (! previewMode){
        document.addEventListener('keyup', keyupHandler);
        window.addEventListener('deviceorientation', orientationHandler);
      } else {
        document.title = "Presenter View";
      }

      window.addEventListener('hashchange', locationChangeHandler);
}

window.addEventListener('load', LeanSlideshow);
