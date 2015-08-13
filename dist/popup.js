
var port = chrome.extension.connect({
    name: "Sample Communication"
});

// Receive part
port.onMessage.addListener(function(msg) {
        console.log("message recieved"+ msg);
});

setInterval(function () {

    port.postMessage("Hi BackGround");
}, 1e3);


