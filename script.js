function LeanSlideshow() {
  var d = document,
      slides = d.getElementsByTagName('article'),
      current = window.location.href.match(/#\d+$/);

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

        for(var i = 0; i < current - 1; i++) {
            slides[i].classList.add('before-prev');
        }

        for(var i = current + 1; i < slides.length; i++) {
            slides[i].classList.add('after-next');
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

      function keyupHandler(e){
        switch(e.keyCode) {
          case 37:
            if (current > 0) {
              window.location.href = window.location.href.replace('#'+(current+1), '#'+(--current+1));
              refreshClasses();
            }
            break;
          case 39:
            if (current < slides.length-1) {
              window.location.href = window.location.href.replace('#'+(current+1), '#'+(++current+1));
              refreshClasses();
            }
            break;
        }
      }

      document.addEventListener('keyup', keyupHandler);
}

window.addEventListener('load', LeanSlideshow);
