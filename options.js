function dualCheck_options() {
  var dualBox = document.getElementById('dualCheck')

  if (dualBox.checked) {
    localStorage.setItem("TYPE", "left");
    console.log('checked');
  }
  else {
    localStorage.setItem("TYPE", 'single');
    console.log('unchecked');
  }

  // Update status to let user know options were saved.
  var status = document.getElementById("status4");
  if (dualBox.checked) {
    status.innerHTML = "Please save orientation and calibrate.";
    setTimeout(function() {
      status.innerHTML = "";
    }, 750);
  }
  else {
    status.innerHTML = "Single Monitor Mode.";
    setTimeout(function() {
      status.innerHTML = "";
    }, 750);
  }
}

function calibrate_options() {
  var w = window.screen.width
  var h = window.screen.height
  var x = window.screenLeft
  var y = window.screenTop
  localStorage.setItem("DUALW", w);
  localStorage.setItem("DUALH", h);
  localStorage.setItem("DUALX", x);
  localStorage.setItem("DUALY", y);

  // Update status to let user know options were saved.
  var status = document.getElementById("status2");
  status.innerHTML = "Calibrated.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Saves options to localStorage.
function monitor_options() {
  var select = document.getElementById("monitors");
  var monitor = select.children[select.selectedIndex].value;
  localStorage.setItem("TYPE", monitor);

  // Update status to let user know options were saved.
  var status = document.getElementById("status3");
  status.innerHTML = "Monitor Status Saved." + monitor;
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

document.querySelector('#dualCheck').addEventListener('click', dualCheck_options);
document.querySelector('#calibrate').addEventListener('click', calibrate_options);
document.querySelector('#calibrate').addEventListener('click', monitor_options);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
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
