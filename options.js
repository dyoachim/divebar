function dualCheck_options() {
  var dualBox = document.getElementById('dualCheck')

  if (dualBox.checked) {localStorage.setItem("dualMode", 'checked');}
  else {localStorage.setItem("dualMode", 'unchecked');}
}

function show_dual_options() {
  var chkbox = document.getElementById("dualCheck")
  var divbox = document.getElementById("dualOptions")

  if(chkbox.checked == true) {divbox.style.display = "";}
  else {divbox.style.display = "none";}
}

function calibrate_dual_options() {
  var w = window.screen.width
  var h = window.screen.height
  var x = window.screenLeft
  var y = window.screenTop
  localStorage.setItem("DUALW", w);
  localStorage.setItem("DUALH", h);
  localStorage.setItem("DUALX", x);
  localStorage.setItem("DUALY", y);

  var status = document.getElementById("status_dual");
  status.innerHTML = "Secondary monitor calibrated.";
  setTimeout(function() {status.innerHTML = "";}, 1200);
}

function calibrate_base_options() {
  w = window.screen.width
  h = window.screen.height
  localStorage.setItem("BASEW", w);
  localStorage.setItem("BASEH", h);

  var status = document.getElementById("status_base");
  status.innerHTML = "Primary monitor calibrated.";
  setTimeout(function() {status.innerHTML = "";}, 1200);
}

function restore_settings(){
  var dualBox = document.getElementById('dualCheck')
  var divbox = document.getElementById("dualOptions")

  if (localStorage.getItem("TYPE") == "checked") {
    dualBox.checked = true;
    divbox.style.display = "";
  }
  else {
    dualBox.checked = false;
    divbox.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', restore_settings);
document.querySelector('#dualCheck').addEventListener('click', dualCheck_options);
document.querySelector('#dualCheck').addEventListener('click', show_dual_options);
document.querySelector('#calibrate_base').addEventListener('click', calibrate_base_options);
document.querySelector('#calibrate_dual').addEventListener('click', calibrate_dual_options);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var a = parseInt(localStorage.getItem('BASEW'))
    if (a == null)
      a = window.screen.width
    var b = parseInt(localStorage.getItem('BASEH'))
    if (b == null)
      b = window.screen.height
    var c = parseInt(localStorage.getItem('DUALW'))
    if (c == null)
      c = 0
    var d = parseInt(localStorage.getItem('DUALH'))
    if (d == null)
      d = 0
    var e = parseInt(localStorage.getItem('DUALX'))
    if (e == null)
      e = 0
    var f = parseInt(localStorage.getItem('DUALY'))
    if (f == null)
      f = 0
    var dualMode = localStorage.getItem('dualMode')
    if (dualMode == null)
      dualMode = "unchecked"

    console.log(sender.tab ?
      "from a content script:" + sender.tab.url : "from the extension");
    if (request.greeting == "getDualNums")
      sendResponse({dualNums: [a,b,c,d,e,f]});
    if (request.greeting == "checkDualMode")
      sendResponse({dualMode: dualMode});
  });
