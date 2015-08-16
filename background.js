
var HNFirebase = function (baseURL)
{
    this.ITEM_LIMIT = 10;

    this.fireRef = new Firebase(baseURL);
    this.newsRef = this.fireRef.child("topstories");

    this.onNewItem = this.defaultOnNewItem;
    this.onInitLoad = this.defaultOnInit;
};

HNFirebase.prototype.addListeners = function ()
{
    // TODO: make the component more loose coupled, currently
    // the 'chrome' object is tight coupled

    // Reads entire content of Firebase database reference,
    // even if only single item has changed
    this.newsRef
        .limitToFirst(this.ITEM_LIMIT)
        .once("value", this.onValue, this.onError, this);

    // Triggered once for each existing child
    this.newsRef
        .limitToFirst(this.ITEM_LIMIT)
        .on("child_added", this.onChildAdd, this.onError, this);

    this.newsRef
        .limitToFirst(this.ITEM_LIMIT)
        .on("child_changed", this.onChildChange, this.onError, this);

    this.newsRef
        .limitToFirst(this.ITEM_LIMIT)
        .on("child_removed", this.onChildRemove, this.onError, this);
};

HNFirebase.prototype.removeListeners = function ()
{
        this.newsRef.off();
        this.fireRef.off();
};

HNFirebase.prototype.onValue = function (snapshot)
{
    console.log("[FIRE] Value change", snapshot.val());
    var itemIDs = snapshot.val();

    if (!Array.isArray(itemIDs))
    {
        return;
    }

    // Convert the array style into object
    var arrayToObject = function (items)
    {
        return items.reduce(function (prev, item)
        {
            prev[item.id] = item;
            return prev;
        }, {});
    };

    // Generate promises
    var promises = itemIDs.map(function (itemID)
    {
        return this.getNewsItem(itemID);
    }.bind(this));

    // When all the requests are done
    return Promise.all(promises)
        .then(arrayToObject)
        .then(this.onInitLoad.bind(this));
};

HNFirebase.prototype.onChildAdd = function (snapshot, prevChildKey)
{
    console.log("[FIRE] Added", snapshot.val(), prevChildKey);

    this.getNewsItem(snapshot.val())
        .then(this.onNewItem.bind(this));
};

HNFirebase.prototype.onChildChange = function (childSnapshot, prevChildKey)
{
    console.log("[FIRE] Child change", childSnapshot.val(), prevChildKey);

    this.getNewsItem(childSnapshot.val())
        .then(this.onNewItem.bind(this));
};

HNFirebase.prototype.onChildRemove = function ()
{
    console.log("[FIRE] Child remove", arguments);
};

HNFirebase.prototype.onError = function (err)
{
    console.error("[FIRE] Firebase error", err);
};

HNFirebase.prototype.defaultOnNewItem = function (item)
{
    console.log("[FIRE] Default action when new item received");
};

HNFirebase.prototype.defaultOnInit = function ()
{
    console.log("[FIRE] Default init load action");
};

HNFirebase.prototype.getNewsItem = function (itemID)
{
    return new Promise(function (resolve)
    {
        this.fireRef
            .child("item")
            .child(itemID)
            .once("value", function (S)
            {
                return resolve(S.val());
            });
    }.bind(this));
};

// Local storage
function initializeDefaultValues ()
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
}

initializeDefaultValues();

// Create a instance
var BASE_URL = "https://hacker-news.firebaseio.com/v0/";

var hnFire = new HNFirebase(BASE_URL);
hnFire.addListeners();

var startTime = Date.now();
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
        console.log("Receive", msg);
    });
});
