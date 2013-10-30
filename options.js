function dualCheck_options() {
  var dualBox = document.getElementById('dualCheck')

  if (dualBox.checked) {
    localStorage.setItem("TYPE", 'checked');
  }
  else {
    localStorage.setItem("TYPE", 'unchecked');
  }
}

function showMe() {
  var chkbox = document.getElementById("dualCheck")
  var divbox = document.getElementById("dualOptions")
  if(chkbox.checked == true) {
          divbox.style.display = "";
  }
  else {
          divbox.style.display = "none";
  }
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

  // Update status to let user know options were saved.
  var status = document.getElementById("status_dual");
  status.innerHTML = "Secondary monitor calibrated.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function calibrate_base_options() {
  w = window.screen.width
  h = window.screen.height
  localStorage.setItem("BASEW", w);
  localStorage.setItem("BASEH", h);

  // Update status to let user know options were saved.
  var status = document.getElementById("status_base");
  status.innerHTML = "Primary monitor calibrated.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
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
document.querySelector('#dualCheck').addEventListener('click', showMe);
document.querySelector('#calibrate_base').addEventListener('click', calibrate_base_options);
document.querySelector('#calibrate_dual').addEventListener('click', calibrate_dual_options);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "getBASEW")
      sendResponse({BASEW: localStorage.getItem('BASEW')});
    if (request.greeting == "getBASEH")
      sendResponse({BASEH: localStorage.getItem('BASEH')});
    if (request.greeting == "getDUALW")
      sendResponse({DUALW: localStorage.getItem('DUALW')});
    if (request.greeting == "getDUALH")
      sendResponse({DUALH: localStorage.getItem('DUALH')});
    if (request.greeting == "getDUALX")
      sendResponse({DUALX: localStorage.getItem('DUALX')});
    if (request.greeting == "getDUALY")
      sendResponse({DUALY: localStorage.getItem('DUALY')});
    if (request.greeting == "getTYPE")
      sendResponse({TYPE: localStorage.getItem('TYPE')});
  });
