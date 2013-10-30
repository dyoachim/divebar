Divebar = ->
  window.chrome ?={}
  
  SCRNW = window.screen.width
  SCRNH = window.screen.height
  TYPE  = chrome.runtime.sendMessage {greeting:"getTYPE"}, (response) -> TYPE  = response.TYPE
  TYPE ?= "unchecked"
  BASEW = chrome.runtime.sendMessage {greeting:"getBASEW"},(response) -> BASEW = parseInt(response.BASEW)
  BASEH = chrome.runtime.sendMessage {greeting:"getBASEH"},(response) -> BASEH = parseInt(response.BASEH)
  DUALW = chrome.runtime.sendMessage {greeting:"getDUALW"},(response) -> DUALW = parseInt(response.DUALW)
  DUALH = chrome.runtime.sendMessage {greeting:"getDUALH"},(response) -> DUALH = parseInt(response.DUALH)
  DUALX = chrome.runtime.sendMessage {greeting:"getDUALX"},(response) -> DUALX = parseInt(response.DUALX)
  DUALY = chrome.runtime.sendMessage {greeting:"getDUALY"},(response) -> DUALY = parseInt(response.DUALY)

  $ -> $('body > *').wrapAll("<div id='dive-div' />")
  $ -> $('#dive-div').css('position', "relative")
  $ -> $('#dive-div').wrapAll("<div id='dive-div2' />")

  getCoordinates = (x, y, w, h) -> 
    C = []
    p = y + h
    r = DUALY + DUALH
    t = x + w
    u = DUALX + DUALW
    left   = (DUALX == -DUALW)
    right  = (DUALX ==  BASEW)
    bottom = (DUALY == BASEH)
    
    if (TYPE == "unchecked")
      if (t > SCRNW)
        C[0] = (t - SCRNW)
      else
        C[0] = 0

      if (p > SCRNH)
        C[1] = (p - SCRNH )
      else
        C[1] = 0

      if (x < 0)
        C[2] = (-x)
      else
        C[2] = 0
    else if (TYPE == "checked")
      if t > BASEW && (left || (p < BASEH && bottom))
        C[0] = t - BASEW
      else if  t > (BASEW + DUALW) && right
        C[0] = t - (BASEW + DUALW)
      else if  y > BASEH && t > u && bottom
        C[0] = t - u
      else
        C[0] = 0

      if  (p > BASEH) && ((x > 0 && left) || (t < BASEW && right))
        C[1] = p - BASEH
      else if (p > r) && ((t < 0 && left) || (x > BASEW && right))
        C[1] = p - r
      else if  p > (BASEH + DUALH) && bottom
        C[1] = p - (BASEH + DUALH)
      else
        C[1] = 0
        
      if left && x < -DUALW
        C[2] = -(x + DUALW)
      else if (x < 0) && (right || (p < BASEH && bottom))
        C[2] = -x
      else if  DUALX > x && y > BASEH  && bottom
        C[2] = DUALX - x
      else
        C[2] = 0

    return C

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