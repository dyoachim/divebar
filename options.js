function dualCheckOptions() {
  var dualBox = document.getElementById('dualCheck');

  if (dualBox.checked) localStorage.setItem("dualMode", 'checked');
  else localStorage.setItem("dualMode", 'unchecked');
}

function showDualOptions() {
  var chkbox = document.getElementById("dualCheck");
  var divbox = document.getElementById("dualOptions");

  if (chkbox.checked === true) divbox.style.display = "";
  else divbox.style.display = "none";
}

function calibrateBaseOptions() {
  localStorage.setItem("BASEW", window.screen.width);
  localStorage.setItem("BASEH", window.screen.height);

  var status = document.getElementById("statusBase");
  status.innerHTML = "Primary monitor calibrated.";
  setTimeout(function() {status.innerHTML = "";}, 1200);

  drawMonitors();
}

function calibrateDualOptions() {
  localStorage.setItem("DUALW", window.screen.width);
  localStorage.setItem("DUALH", window.screen.height);
  localStorage.setItem("DUALX", window.screenLeft);
  localStorage.setItem("DUALY", window.screenTop);

  var status = document.getElementById("statusDual");
  status.innerHTML = "Secondary monitor calibrated.";
  setTimeout(function() {status.innerHTML = "";}, 1200);

  drawMonitors();
}

function restoreSettings() {
  var dualBox = document.getElementById('dualCheck');
  var divbox = document.getElementById("dualOptions");
  var c = document.getElementById("screenCanvas");
  var ctx = c.getContext("2d");
  ctx.scale(0.15,0.15);

  if (localStorage.getItem("dualMode") === "checked") {
      dualBox.checked = true;
      divbox.style.display = "";
  }
  else {
      dualBox.checked = false;
      divbox.style.display = "none";
  }
  drawMonitors();
}

function drawMonitors(){
  var bw = parseInt(localStorage.getItem('BASEW'),10) || 0;
  var bh = parseInt(localStorage.getItem('BASEH'),10) || 0;
  var dx = parseInt(localStorage.getItem('DUALX'),10) || 0;
  var dy = parseInt(localStorage.getItem('DUALY'),10) || 0;
  var dw = parseInt(localStorage.getItem('DUALW'),10) || 0;
  var dh = parseInt(localStorage.getItem('DUALH'),10) || 0;

  var baseStatus = document.getElementById("baseScreenCalib");
  baseStatus.innerHTML = "(0,0) W:" + bw + " H:" + bw;

  var dualStatus = document.getElementById("dualScreenCalib");
  dualStatus.innerHTML = "("+ dx + "," + dy +") " + "W:"+ dw + " H:" + dh;

  var c = document.getElementById("screenCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 6000, 4000);

 //monitors
  ctx.lineWidth = 1;
  ctx.fillStyle="#00FFFF";
  if (dx < 0) {
    if (dy < 0) ctx.fillRect(-dx,-dy,bw,bh);
    else ctx.fillRect(-dx,0,bw,bh);
  }
  else {
    if (dy < 0) ctx.fillRect(0,-dy,bw,bh);
    else ctx.fillRect(0,0,bw,bh);
  }
  ctx.fillStyle="#33CCCC";
  if (dx < 0) {
    if (dy < 0) ctx.fillRect(0,0,dw,dh);
    else ctx.fillRect(0,dy,dw,dh);
  }
  else {
    if (dy < 0) ctx.fillRect(dx,0,dw,dh);
    else ctx.fillRect(dx,dy,dw,dh);
  }
  //boundaries 
  ctx.lineWidth = 80;
  ctx.beginPath();
  ctx.strokeStyle = '#00CC00';
  if (dx < 0) {
    if (dy < 0) {
      ctx.moveTo((-dx) + bw - 40, -dy);
      ctx.lineTo((-dx) + bw - 40, bh + (-dy));
      ctx.moveTo(dw, (-dy) + bh -40);
      ctx.lineTo(((-dx) + bw), (-dy) + bh - 40);
    }
    else {
      ctx.moveTo((-dx) + bw - 40,0);
      ctx.lineTo((-dx) + bw - 40,bh);
      if (dy === bh) {
        ctx.moveTo((-dx) + 40,0);
        ctx.lineTo((-dx) + 40,bh);
      }
      else {
        ctx.moveTo((-dx),bh-40);
        ctx.lineTo((-dx) + bw,bh-40);
      }
    }
  }
  else {
    if (dy < 0) {
      ctx.moveTo(0 + 40,-dy);
      ctx.lineTo(0 + 40,bh+(-dy));
      ctx.moveTo(0,(-dy) + bh - 40);
      ctx.lineTo(bw,(-dy) + bh - 40);
    }
    else {
      ctx.moveTo(0+40, 0);
      ctx.lineTo(0+40, bh);
      if (dy === bh) {
        ctx.moveTo(bw - 40, 0);
        ctx.lineTo(bw - 40, bh);
      }
      else {
        ctx.moveTo(0, bh - 40);
        ctx.lineTo(bw, bh - 40);
      }
    }
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = '#00FF00';
  if (dx < 0) {
    if (dy < 0) {
      ctx.moveTo(0 + 40, 0);
      ctx.lineTo(0 + 40, dh);
      ctx.moveTo(0, dh - 40);
      ctx.lineTo(dw, dh - 40);
    }
    else {
      ctx.moveTo(0 + 40,dy);
      ctx.lineTo(0 + 40,dh+dy);
      ctx.moveTo(0,dh + dy - 40);
      ctx.lineTo(dw,dh + dy - 40);
      if (dy === bh) {
        ctx.moveTo(dw - 40,dy);
        ctx.lineTo(dw - 40,dy+dh);
      }
    }
  }
  else {
    if (dy < 0) {
      ctx.moveTo(dx + dw - 40,0);
      ctx.lineTo(dx + dw - 40,dh);
      ctx.moveTo(dx,dh - 40);
      ctx.lineTo(dx + dw,dh - 40);
    }
    else {
      ctx.moveTo(dx + dw - 40,dy);
      ctx.lineTo(dx + dw - 40,dy + dh);
      ctx.moveTo(dx,dy + dh - 40);
      ctx.lineTo(dx + dw,dy + dh - 40);
      if (dy === bh) {
        ctx.moveTo(dx + 40, dy);
        ctx.lineTo(dx + 40, dy + dh);
      }
    }
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = '#990000';
  if (dx < 0) {
      if (dy < 0) {
        ctx.moveTo(-dx + 40, -dy);
        ctx.lineTo(-dx + 40, dh);
      }
      else {
          if (dy === bh) {
            ctx.moveTo((-dx),bh-40);
            ctx.lineTo((-dx) + bw,bh-40);
          }
          else {
            ctx.moveTo((-dx) + 40,0);
            ctx.lineTo((-dx) + 40,bh);
          }
      }
  }
  else {
    if (dy < 0) {
      ctx.moveTo(bw - 40,-dy);
      ctx.lineTo(bw - 40,(-dy)+bh);
    }
    else {
      if (dy === bh) {
        ctx.moveTo(0, bh - 40);
        ctx.lineTo(bw, bh - 40);
      }
      else {
        ctx.moveTo(bw - 40, 0);
        ctx.lineTo(bw - 40, bh);
      }
    }
  }
  if (dx < 0) {
    if (dy < 0) {
      ctx.moveTo((-dx) - 40, -dy);
      ctx.lineTo(dw - 40, dh);
    }
    else {
      if(dy === bh) {
        ctx.moveTo(0,dy);
        ctx.lineTo(dw,dy);
      }
      else{
        ctx.moveTo(dw - 40,dy);
        ctx.lineTo(dw - 40,dy+dh);
      }
    }
  }
  else {
    if (dy < 0) {
      ctx.moveTo(dx + 40, 0);
      ctx.lineTo(dx + 40, dh);
    }
    else {
      if (dy === bh) {
        ctx.moveTo(dx,dy);
        ctx.lineTo(dx + dw,dy);
      }
      else {
        ctx.moveTo(dx + 40, dy);
        ctx.lineTo(dx + 40, dy + dh);
      }
    }
  }
  ctx.stroke();
}

document.addEventListener('DOMContentLoaded', restoreSettings);
document.querySelector('#dualCheck').addEventListener('click', dualCheckOptions);
document.querySelector('#dualCheck').addEventListener('click', showDualOptions);
document.querySelector('#calibrateBase').addEventListener('click', calibrateBaseOptions);
document.querySelector('#calibrateDual').addEventListener('click', calibrateDualOptions);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var a = parseInt(localStorage.getItem('BASEW'),10) || window.screen.width;
        var b = parseInt(localStorage.getItem('BASEH'),10) || window.screen.height;
        var c = parseInt(localStorage.getItem('DUALW'),10) || 0;
        var d = parseInt(localStorage.getItem('DUALH'),10) || 0;
        var e = parseInt(localStorage.getItem('DUALX'),10) || 0;
        var f = parseInt(localStorage.getItem('DUALY'),10) || 0;
        var dualMode = localStorage.getItem('dualMode') || "unchecked";

        console.log(sender.tab ?
            "from a content script:" + sender.tab.url : "from the extension");
        if (request.greeting === "checkMode") sendResponse({dualNums: [a,b,c,d,e,f],dualMode: dualMode});
        
    });
