
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


chrome.storage.onChanged.addListener(function (changes, namespace) {

    var key;
    for (key in changes) {

        var change = changes[key];

        console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      change.oldValue,
                      change.newValue);
    };
});
