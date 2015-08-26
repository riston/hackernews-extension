
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

    // Generate promises
    var promises = itemIDs.map(function (itemID)
    {
        return this.getItemByID(itemID);
    }.bind(this));

    // When all the requests are done
    return Promise.all(promises)
        .then(this._arrayToObject.bind(this))
        .then(this.onInitLoad.bind(this));
};

HNFirebase.prototype.onChildAdd = function (snapshot, prevChildKey)
{
    console.log("[FIRE] Added", snapshot.val(), prevChildKey);

    this.getItemByID(snapshot.val())
        .then(this.onNewItem.bind(this));
};

HNFirebase.prototype.onChildChange = function (childSnapshot, prevChildKey)
{
    console.log("[FIRE] Child change", childSnapshot.val(), prevChildKey);

    this.getItemByID(childSnapshot.val())
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

HNFirebase.prototype.getItemByID = function (itemID)
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

HNFirebase.prototype.getComments = function (itemID)
{
    var load = function (item)
    {
        var commentIDs = item.kids || [];

        // Lets load only the first level comments
        var commentPromises = commentIDs.map(function (currentItemID)
        {
            return this.getItemByID(currentItemID);
        }, this);

        // Return until all the promies are fulfilled
        return Promise.all(commentPromises);
    }.bind(this);

    return this.getItemByID(itemID)
        .then(load)
        .then(this._arrayToObject.bind(this));
};

/**
 * Transform the array into object.
 *
 * @param  {Array} array Make sure the array items has the 'id' property.
 * @return {Object}
 */
HNFirebase.prototype._arrayToObject = function (array)
{
    return array.reduce(function (prev, item)
    {
        prev[item.id] = item;
        return prev;
    }, {});
};
