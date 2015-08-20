
var setBadge = function (text)
{
    // Add badge
    chrome.browserAction.setBadgeText({ text: text });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#F00" });
};

// Local storage
var initializeDefaultValues = function ()
{
    // The key has been set, which means the default state
    // values is already set
    if (localStorage.getItem("default_value")) {
        return;
    }

    // Initial state
    var init_state = {
        App: {
            first_start_time: Date.now(),
            count: 15,
            items: { },
            comments: { },
        }
    };

    chrome.storage.local.set(init_state, function ()
    {
        console.log("Initialized the default state");

        // Change key value
        localStorage.setItem("default_value", true);
    });
};

// Depends currently on the firebase instance
var loadComments = function (itemID)
{
    return hnFire.getComments(itemID);
};

initializeDefaultValues();

// Create a instance
var BASE_URL = "https://hacker-news.firebaseio.com/v0/";

var hnFire = new HNFirebase(BASE_URL);
hnFire.addListeners();

var startTime = Date.now();

// TODO: The storage state property set needs refactor
hnFire.onInitLoad = function (items)
{
    console.log("Items loaded", items, Date.now() - startTime);

    chrome.storage.local.get(null, function (state)
    {
        if (!state || !state.App || !state.App.items)
        {
            console.error("Trying to save items, when there is no initial structure");
            return;
        }

        // Overwrite all the items, instead use merge ?
        state.App.items = items;

        // Set or overwrite existing value
        chrome.storage.local.set(state, function ()
        {
            if (chrome.runtime.lastError)
            {
                console.error("Failed to store state", chrome.runtime.lastError);
            }

            console.log("Batch save", items, state);
        });
    });
};

hnFire.onNewItem = function (item)
{
    // Need to get the current storage value
    chrome.storage.local.get(null, function (state)
    {
        if (!state || !state.App || !state.App.items)
        {
            console.error("Trying to save items, when there is no initial structure");
            return;
        }

        state.App.items[item.id] = item;

        // Set or overwrite existing value
        chrome.storage.local.set(state, function ()
        {
            if (chrome.runtime.lastError)
            {
                console.error("Failed to store state", item.id, chrome.runtime.lastError);
            }

            setBadge("!");

            console.log("Saved item", item.id, state);
        });
    });
};

console.log("Background page started");

// The script context here is chrome background script
// Do not use the require or any other node scripts here
chrome.extension.onConnect.addListener(function (port)
{
    console.log("Background connected");

    // Get message from popup.js
    port.onMessage.addListener(function (msg)
    {
        if (msg.event === "popup-open")
        {
            setBadge("");
            return;
        }

        console.log("Unkown receive", msg);
    });
});
