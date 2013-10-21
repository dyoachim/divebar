Divebar = ->
  window.chrome ?={}
  
  SCRNH = window.screen.height
  SCRNW = window.screen.width
  
  TYPE  = chrome.runtime.sendMessage {greeting:"getTYPE"}, (response) -> TYPE  = response.TYPE
  DUALW = chrome.runtime.sendMessage {greeting:"getDUALW"},(response) -> DUALW = parseInt(response.DUALW)
  DUALH = chrome.runtime.sendMessage {greeting:"getDUALH"},(response) -> DUALH = parseInt(response.DUALH)
  DUALX = chrome.runtime.sendMessage {greeting:"getDUALX"},(response) -> DUALX = parseInt(response.DUALX)
  DUALY = chrome.runtime.sendMessage {greeting:"getDUALY"},(response) -> DUALY = parseInt(response.DUALY)

  $ -> $('body > *').wrapAll("<div id='dive-div' />")
  $ -> $('#dive-div').css('position', "relative")
  $ -> $('#dive-div').wrapAll("<div id='dive-div2' />")

  getCoordinates = (x, y, w, h) -> 
    padding = []
    p = y + h
    r = DUALY + DUALH
    t = x + w
    u = DUALX + DUALW
    
    if (TYPE == "single")
      if (t > SCRNW)
        padding[0] = (t - SCRNW)
      else
        padding[0] = 0

      if (p > SCRNH)
        padding[1] = (p - SCRNH )
      else
        padding[1] = 0

      if (x < 0)
        padding[2] = (-x)
      else
        padding[2] = 0

    if (TYPE == "left")
      if (t > SCRNW)
        padding[0] = (t - SCRNW)
      else
        padding[0] = 0

      if (p > SCRNH) && (x > 0)
        padding[1] = p - SCRNH
      else if (t < 0) && (p > r)
        padding[1] = p - r
      else
        padding[1] = 0
      
      if (x < (-DUALW))
        padding[2] = (-x) - DUALW
      else
        padding[2] = 0

    if (TYPE == "right")
      if (t > (SCRNW + DUALW))
        padding[0] = t - (SCRNW + DUALW)
      else
        padding[0] = 0

      if (p > SCRNH) && (t < SCRNW)
        padding[1] = p - SCRNH
      else if (p > r) && (x > SCRNW)
        padding[1] = p - r
      else
        padding[1] = 0
      
      if (x < 0)
        padding[2] = -x
      else
        padding[2] = 0

    if (TYPE == "below")
      if (t > SCRNW) && (p < SCRNH)
        padding[0] = t - SCRNW
      else if (y > SCRNH) && (t > u)
        padding[0] = t - u
      else
        padding[0] = 0

      if (p > (SCRNH + DUALH))
        padding[1] = p - (SCRNH + DUALH)
      else
        padding[1] = 0

      if (x < 0) && (p < SCRNH)
        padding[2] = -x
      else if (y > SCRNH) && (x < DUALX)
        padding[2] = DUALX - x
      else
        padding[2] = 0

    return padding

  appendPadding = (padding) ->   
    DIV = $('#dive-div2')
    DIV.css('width', '100%')
    DIV.css('positon', 'relative')
    DIV.css('padding-right',  padding[0] + "px")
    DIV.css('padding-bottom', padding[1] + "px")
    DIV.css('padding-left',   padding[2] + "px")

  setInterval ->
    if ( x != window.screenLeft || y != window.screenTop )
      x = window.screenLeft
      y = window.screenTop
      w = window.outerWidth
      h = window.outerHeight
      appendPadding(getCoordinates(x,y,w,h))
  , 200


Divebar()