function dualCheckOptions() {
    var dualBox = document.getElementById('dualCheck')

    if (dualBox.checked) {
        localStorage.setItem("dualMode", 'checked');
    }
    else {
        localStorage.setItem("dualMode", 'unchecked');
    }
}

function showDualOptions() {
    var chkbox = document.getElementById("dualCheck")
    var divbox = document.getElementById("dualOptions")

    if (chkbox.checked === true) {
        divbox.style.display = "";
    }
    else {
        divbox.style.display = "none";
    }
}


function calibrateBaseOptions() {
    var w = window.screen.width
    var h = window.screen.height
    localStorage.setItem("BASEW", w);
    localStorage.setItem("BASEH", h);

    var status = document.getElementById("statusBase");
    status.innerHTML = "Primary monitor calibrated.";
    setTimeout(function() {status.innerHTML = "";}, 1200);

    drawMonitors();
}

function calibrateDualOptions() {
    var w = window.screen.width
    var h = window.screen.height
    var x = window.screenLeft
    var y = window.screenTop
    localStorage.setItem("DUALW", w);
    localStorage.setItem("DUALH", h);
    localStorage.setItem("DUALX", x);
    localStorage.setItem("DUALY", y);

    var status = document.getElementById("statusDual");
    status.innerHTML = "Secondary monitor calibrated.";
    setTimeout(function() {status.innerHTML = "";}, 1200);

    drawMonitors();
}

function restoreSettings() {
    var dualBox = document.getElementById('dualCheck')
    var divbox = document.getElementById("dualOptions")
    var c = document.getElementById("screenCanvas");
    var ctx = c.getContext("2d");
    ctx.scale(.15,.15);

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
    var bw = parseInt(localStorage.getItem('BASEW'));
    var bh = parseInt(localStorage.getItem('BASEH'));
    var dx = parseInt(localStorage.getItem('DUALX'));
    var dy = parseInt(localStorage.getItem('DUALY'));
    var dw = parseInt(localStorage.getItem('DUALW'));
    var dh = parseInt(localStorage.getItem('DUALH'));

    var baseStatus = document.getElementById("baseScreenCalib");
    baseStatus.innerHTML = "(0,0) W:" + bw + " H:" + bw;

    var dualStatus = document.getElementById("dualScreenCalib");
    dualStatus.innerHTML = "("+ dx + "," + dy +")" + "W:"+ dw + " H:" + dh;

    var c = document.getElementById("screenCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 6000, 4000);

    //Base
    ctx.fillStyle="#FF0000";
    if (dx < 0) {
        if (dy < 0) {
            ctx.fillRect(-dx,-dy,bw,bh);
        }
        else {
            ctx.fillRect(-dx,0,bw,bh);
        }
    }
    else {
        if (dy < 0) {
            ctx.fillRect(0,-dy,bw,bh);
        }
        else {
            ctx.fillRect(0,0,bw,bh);
        }      
    }

    //Dual
    ctx.fillStyle="#0000FF";
    if (dx < 0) {
        if (dy < 0) {
            ctx.fillRect(0,0,dw,dh);
        }
        else {
            ctx.fillRect(0,dy,dw,dh);
        }
    }
    else {
        if (dy < 0) {
            ctx.fillRect(dx,0,dw,dh);
        }
        else {
            ctx.fillRect(dx,dy,dw,dh);
        }
    }
}

document.addEventListener('DOMContentLoaded', restoreSettings);
document.querySelector('#dualCheck').addEventListener('click', dualCheckOptions);
document.querySelector('#dualCheck').addEventListener('click', showDualOptions);
document.querySelector('#calibrateBase').addEventListener('click', calibrateBaseOptions);
document.querySelector('#calibrateDual').addEventListener('click', calibrateDualOptions);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var a = parseInt(localStorage.getItem('BASEW') || window.screen.width)
        var b = parseInt(localStorage.getItem('BASEH') || window.screen.height)
        var c = parseInt(localStorage.getItem('DUALW') || 0)
        var d = parseInt(localStorage.getItem('DUALH') || 0)
        var e = parseInt(localStorage.getItem('DUALX') || 0)
        var f = parseInt(localStorage.getItem('DUALY') || 0)
        var dualMode = (localStorage.getItem('dualMode') || "unchecked")

        console.log(sender.tab ?
            "from a content script:" + sender.tab.url : "from the extension");
        if (request.greeting === "getDualNums") {
            sendResponse({dualNums: [a,b,c,d,e,f]});
        }
        if (request.greeting === "checkDualMode"){
            sendResponse({dualMode: dualMode});
        }
    });
