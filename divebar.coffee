Divebar = ->
  SCRNH = window.screen.height
  SCRNW = window.screen.width
  $ -> $('body > *').wrapAll("<div id='dive-div' />")
  $ -> $('#dive-div').css('position', "relative")
  $ -> $('#dive-div').wrapAll("<div id='dive-div2' />")

  getX = ->
    knownX  = window.screenLeft
    knownX ?= window.screenX

  getY = ->
    knownY  = window.screenTop
    knownY  ?= window.screenY

  append_padding = (x, y) ->
    wrapDiv = $('#dive-div2')
    w = window.outerWidth
    h = window.outerHeight
    
    if (x + w > SCRNW)
      wrapDiv.css('padding-right', (x + w - SCRNW) + "px")
      wrapDiv.css('width', '100%')
    else
      wrapDiv.css('padding-right', "0px")

    if (y + h > SCRNH)
      wrapDiv.css('padding-bottom', (y + h - SCRNH ) + "px")
    else
      wrapDiv.css('padding-bottom', "0px")
    
    if (x < 0)
      wrapDiv.css('padding-left', ((-x) + "px"))
      wrapDiv.css('positon', 'relative')
      wrapDiv.css('width', '100%')
    else
      wrapDiv.css('padding-left', "0px")

  setInterval ->
    if ( knownX != getX() || knownY != getY() )
      knownX = getX()
      knownY = getY()

      append_padding(knownX,knownY)
  , 200


Divebar()