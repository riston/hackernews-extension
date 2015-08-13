
import Firebase from "firebase";
import {EventEmitter} from "events";

const ITEM_LIMIT = 25;

export default class HNFirebase extends EventEmitter {

    constructor(url)
    {
        // EventEmitter base class
        super();

        this.fireRef = new Firebase(url);
        this.newsRef = this.fireRef.child("topstories");
    }

    addListeners ()
    {
        // Reads entire content of Firebase database reference,
        // even if only single item has changed
        this.newsRef
            .limitToFirst(ITEM_LIMIT)
            .once("value", this.onValue, this.onError, this);

        // Triggered once for each existing child
        this.newsRef
            .limitToFirst(ITEM_LIMIT)
            .on("child_added", this.onChildAdd, this.onError, this);

        this.newsRef
            .limitToFirst(ITEM_LIMIT)
            .on("child_changed", this.onChildChange, this.onError, this);

        this.newsRef
            .limitToFirst(ITEM_LIMIT)
            .on("child_removed", this.onChildRemove, this.onError, this);
    }

    removeListeners ()
    {
        this.newsRef.off();
        this.fireRef.off();
    }

    onValue (snapshot)
    {
        console.log("[FIRE] Value change", snapshot.val());
    }

    onChildAdd (snapshot, prevChildKey)
    {
        console.log("[FIRE] Added", snapshot.val(), prevChildKey);

        this.getNewsItem(snapshot.val());
    }

    onChildChange (childSnapshot, prevChildKey)
    {
        console.log("[FIRE] Child change", childSnapshot.val(), prevChildKey);

        this.getNewsItem(childSnapshot.val());
    }

    onChildRemove ()
    {
        console.log("[FIRE] Child remove", arguments);
    }

    onError (err)
    {
        console.error("[FIRE] Firebase error", err);
    }

    getNewsItem (itemID)
    {
        this.fireRef
            .child("item")
            .child(itemID)
            .once("value", (S) =>
            {
                this.emit("item", S.val());
            });
    }
}
