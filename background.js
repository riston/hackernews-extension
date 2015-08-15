
var HNFirebase = function (baseURL)
{
    this.ITEM_LIMIT = 25;

    this.fireRef = new Firebase(baseURL);
    this.newsRef = this.fireRef.child("topstories");

    this.onNewItem = this.defaultOnNewItem;
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
};

HNFirebase.prototype.onChildAdd = function (snapshot, prevChildKey)
{
    console.log("[FIRE] Added", snapshot.val(), prevChildKey);
    this.getNewsItem(snapshot.val());
};

HNFirebase.prototype.onChildChange = function (childSnapshot, prevChildKey)
{
    console.log("[FIRE] Child change", childSnapshot.val(), prevChildKey);
    this.getNewsItem(childSnapshot.val());
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

HNFirebase.prototype.getNewsItem = function (itemID)
{
    this.fireRef
        .child("item")
        .child(itemID)
        .once("value", function (S)
        {
            this.onNewItem(S.val());
        }.bind(this));
};

// Create a instance
var BASE_URL = "https://hacker-news.firebaseio.com/v0/";

var hnFire = new HNFirebase(BASE_URL);
hnFire.addListeners();
hnFire.onNewItem = function (item)
{
    var data = {};
    data[item.id] = item;

    chrome.storage.local.set(data, function ()
    {
        console.log("Saved item", item.id);
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
