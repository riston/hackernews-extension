
// The script context here is chrome background script
// Do not use the require or any other node scripts here

chrome.extension.onConnect.addListener(function (port)
{
    console.log("Background connected");

    // Get message from popup.js
    port.onMessage.addListener(function (msg)
    {
        console.log("Receive", msg);
    });
});
