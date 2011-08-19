function LeanSlideshow() {
  var d = document,
      slides = d.getElementsByTagName('article'),
      current = window.location.href.match(/#\d+$/),
      old_orientatnion, orientatnion, wait_for_event=false;

      if(current){
        current = Number(current[0].replace('#',''))-1;
        if(current < 0) {
          current = 0;
        }
      } else {
        current = 0;
        window.location.href = window.location.href + '#' + (current + 1);
      }

      refreshClasses();

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
            console.log('event:');
            wait_for_event = false;
          },300);
        }
      }

      document.addEventListener('keyup', keyupHandler);
      window.addEventListener('deviceorientation', orientationHandler);
}

window.addEventListener('load', LeanSlideshow);
