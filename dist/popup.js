
var port = chrome.extension.connect({
    name: "Background channel"
});

// Send the open event to background
// TODO: the each story item caused too much spam removed
// until there is more clever way to diff the changes
// port.postMessage({ event: "popup-open" });

// Receive part
port.onMessage.addListener(function(msg) {
    console.log("message recieved"+ msg);
});
