Leanshow = ->
  slides = $('article')
  current = undefined
  previewMode = undefined
  presenterView = undefined


  refreshClasses = ->
    currentSlide = $(slides[current])

    slides.removeClass('before-prev after-next prev next current')
    currentSlide
      .addClass('current')
      .prev()
      .addClass('prev')
      .prev()
      .addClass('before-prev')

    currentSlide
      .next()
      .addClass('next')
      .next()
      .addClass('after-next')

      if previewMode
        $('body').addClass('preview')
      else
        $('body').removeClass('preview')
    return undefined

  previousSlide = ->
    if current > 0
      window.location.href = window.location.href.replace('#'+(current+1), '#'+(--current+1))
      refreshClasses()
    return undefined

  nextSlide = ->
    if current < slides.length - 1
      window.location.href = window.location.href.replace('#'+(current+1), '#'+(++current+1))
      refreshClasses()
    return undefined

  openPresenterView = ->
    if presenterView == undefined or presenterView.closed
      presenterView = window.open(window.location.href.replace(/\d+$/, 'preview/'+(current+1)), 'Presenter View')
    else
      presenterView.focus()
    return undefined

  keyupHandler = (e) ->
    switch e.keyCode
      when 37 then previousSlide()
      when 39 then nextSlide()
      when 40 then refreshClasses()
      when 80
        if e.altKey and e.ctrlKey
          openPresenterView()
    return undefined

  locationChangeHandler = (url) ->
    current = window.location.href.match(/\d+$/)
    previewMode = window.location.href.match(/#preview/)

    if current?
      current = Number(current[0])-1
      if current < 0
        window.location.href = window.location.href.replace(current+1, 1)
        current = 0

      if current >= slides.length
        window.location.href = window.location.href.replace(current+1, slides.length)
        current = slides.length-1

    else
      current = 0
      window.location.href = window.location.href + '#' + (current + 1)

    if presenterView?
      presenterView.location.href = presenterView.location.href.replace(/\d+$/, current+1)
    
    refreshClasses()
    return undefined

  if not previewMode?
    document.addEventListener('keyup', keyupHandler)
  else
    document.title = "Presenter View"

  $(window).bind 'hashchange', locationChangeHandler

  locationChangeHandler()
  return undefined

$ -> Leanshow()
