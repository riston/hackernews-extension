
var port = chrome.extension.connect({
    name: "Background channel"
});

// Send the open event to background
port.postMessage({ event: "popup-open" });

// Receive part
port.onMessage.addListener(function(msg) {
    console.log("message recieved"+ msg);
});

setInterval(function () {
    port.postMessage("Hi BackGround");
}, 1e3);
