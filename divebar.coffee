Divebar = ->
  window.chrome ?={}
  wrapped = false
  x = 0
  y = 0
  
  SCRNW = window.screen.width
  SCRNH = window.screen.height

  dualMode  = chrome.runtime.sendMessage {greeting:"checkDualMode"}, (response) -> dualMode  = response.dualMode
  dualMode ?= "unchecked"

  dualNums = chrome.runtime.sendMessage {greeting:"getDualNums"}, (response) -> dualNums = response.dualNums
  dualNums ?= [SCRNW,SCRNH,0,0,0,0]
  
  getCoordinates = (x, y, w, h) -> 

    BASEW = parseInt(dualNums[0])
    BASEH = parseInt(dualNums[1])
    DUALW = parseInt(dualNums[2])
    DUALH = parseInt(dualNums[3])
    DUALX = parseInt(dualNums[4])
    DUALY = parseInt(dualNums[5])

    C = []
    p = y + h
    r = DUALY + DUALH
    t = x + w
    u = DUALX + DUALW
    left   = (DUALX == -DUALW)
    right  = (DUALX ==  BASEW)
    bottom = (DUALY == BASEH)
    
    if (dualMode == "unchecked")
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
    else if (dualMode == "checked")
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
    if padding[0] == 0 && padding[1] == 0 && padding[2] == 0
      if wrapped == true
        $("#dive-div").unwrap()
        $("#dive-div > *").unwrap()
        wrapped = false
    else
      if wrapped == false
        $('body > *').wrapAll("<div id='dive-div' style='position:relative' />")
        $('#dive-div').wrapAll("<div id='dive-div2' style='position:relative; width:100%' />")
        wrapped = true
      DIV = $('#dive-div2')
      DIV.css('padding-right',  padding[0] + "px")
      DIV.css('padding-bottom', padding[1] + "px")
      DIV.css('padding-left',   padding[2] + "px")
      window.scrollBy(padding[2],0)

  setInterval ->
    if ( x != window.screenLeft || y != window.screenTop )
      x = window.screenLeft
      y = window.screenTop
      w = window.outerWidth
      h = window.outerHeight
      appendPadding(getCoordinates(x,y,w,h))
  , 200


Divebar()