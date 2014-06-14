(function() {
  function Divebar() {
    if (window.chrome == null) {
      window.chrome = {};
    }

    var x = window.screenLeft;
    var y = window.screenTop;
    var w, h;
    var SCRNW = window.screen.width;
    var SCRNH = window.screen.height;
    var dualMode, dualNums;

    chrome.runtime.sendMessage({
      greeting: "checkMode"
    }, function(response) {
      dualMode = response.dualMode;
      dualNums = response.dualNums;
    });
    
    if (dualMode == null) { dualMode = "unchecked"; }

    if (dualNums == null) { dualNums = [SCRNW, SCRNH, 0, 0, 0, 0]; }


    function getCoordinates(x, y, w, h) {
      var C = [];
      var BW = dualNums[0];
      var BH = dualNums[1];
      var DW = dualNums[2];
      var DH = dualNums[3];
      var DX = dualNums[4];
      var DY = dualNums[5];

      if (dualMode === "unchecked") {
        var Rbreach = x + w > SCRNW;
        var Bbreach = y + h > SCRNH;
        var Lbreach = x < 0;

        if (Rbreach) {
          C[0] = x + w - SCRNW;
        } else {
          C[0] = 0;
        }

        if (Bbreach) {
          C[1] = y + h - SCRNH;
        } else {
          C[1] = 0;
        }

        if (Lbreach) {
          C[2] = -x;
        } else {
          C[2] = 0;
        }
      }
      else if (dualMode === "checked") {
        var Rbreach_RM = (DX === BW) && (x + w > BW + DW);
        var Rbreach_BBM = (DY === BH) && (x + w > DX + DW) && (y > BH);
        var Rbreach_BDM = (DY === BH) && (x + w > BW) && (y + h < BH);
        var Rbreach_LM = (DX === -DW) && (x + w > BW);

        var Bbreach_RBM = (DX === BW) && (x > BW) && (y + h > DY + DH);
        var Bbreach_RDM = (DX === BW) && (x + w < BW) && (y + h > BH);
        var Bbreach_BM = (DY === BH) && (y + h > BH + DH);
        var Bbreach_LBM = (DX === -DW) && (x > 0) && (y + h > BH);
        var Bbreach_LDM = (DX === -DW) && (x + w < 0) && (y + h > DY + DH);

        var Lbreach_RM = (DX === BW) && (x < 0);
        var Lbreach_BBM = (DY === BH) && (x < 0) && (y + h < BH);
        var Lbreach_BDM = (DY === BH) && (x < DX) && (y > BH);
        var Lbreach_LM = (DX === -DW) && (x < -DW);

        if (Rbreach_LM || Rbreach_BDM) {
          C[0] = x + w - BW;
        }
        else if (Rbreach_RM) {
          C[0] = x + w - BW - DW;
        }
        else if (Rbreach_BBM) {
          C[0] = x + w - DX - DW;
        }
        else {
          C[0] = 0;
        }

        if (Bbreach_LBM || Bbreach_RDM) {
          C[1] = y + h - BH;
        }
        else if (Bbreach_LDM || Bbreach_RBM) {
          C[1] = y + h - DY - DH;
        }
        else if (Bbreach_BM) {
          C[1] = y + h - BH - DH;
        }
        else {
          C[1] = 0;
        }

        if (Lbreach_LM) {
          C[2] = -(x + DW);
        }
        else if (Lbreach_RM || Lbreach_BBM) {
          C[2] = -x;
        }
        else if (Lbreach_BDM) {
          C[2] = DX - x;
        }
        else {
          C[2] = 0;
        }
      }
      return C;
    }

    function appendPadding(coordinates) {
      var negativeElements;
      var hitSite = $('html');

      if (coordinates[0] === 0 && coordinates[1] === 0 && coordinates[2] === 0) {
        hitSite.css('-webkit-transform', "");
        $('*').css('direction', 'ltr');
      }
      else {
        hitSite.css('-webkit-transform',"translateX(" + (coordinates[2] - coordinates[0]) + "px)");
        if ((coordinates[2] - coordinates[0]) < 0) {
          hitSite.css('direction', 'rtl');
          document.body.direction = 'ltr';
          window.scrollBy(-(coordinates[0]),0);

          negativeElements = findLefts();

          for (var i=0; i<negativeElements.length; i++) {
            negativeElements[i].style.direction = 'rtl';
          }
        }
      }

      if (coordinates[2] - coordinates[0] > 0) {
        window.scrollBy(coordinates[2],0);
      }


      function findLefts() {
        var all = document.getElementsByTagName('*');
        var leftElements = [];
        for (var i=0; i<all.length; i++) {
          ti = window.getComputedStyle(all[i]).getPropertyValue('text-indent');
          if (ti.match(/-/)) {
            leftElements.push(all[i]);
          }
        }
        return leftElements;
      }
    }


    return setInterval(function() {
      if (x !== window.screenLeft || y !== window.screenTop) {
        x = window.screenLeft;
        y = window.screenTop;
        w = window.outerWidth;
        h = window.outerHeight;
        return appendPadding(getCoordinates(x, y, w, h));
      }
    }, 200);
  }

  Divebar();

}).call(this);
