
import React from "react";
import Immutable from "immutable";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as reducers from "./Reducer";

import HNFirebase from "./HNFirebase";
import {addItem, loadItems} from "./Action";
import Application from "./component/Application";

// Read the initial state from local storage
let cacheState = {
    count: 15,
    items: { },
    comments: { },
};

const initState = {
    App: Immutable.fromJS(cacheState)
};

// Base url for the HN API
const NEWS_URL = "https://hacker-news.firebaseio.com/v0/";

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, initState);

// Load from chrome storage
if (chrome && chrome.storage && chrome.storage.local)
{
    // Initial load, get all items
    chrome.storage.local.get(null, function (state)
    {
        store.dispatch(loadItems(state.App.items));
    });

    // Listen for changes in storage
    chrome.storage.onChanged.addListener(
        function (changes, namespace)
    {
        for (var key in changes) {

            var change = changes[key];

            store.dispatch(loadItems(change.newValue.items));

            console.log("Storage key '%s' in namespace '%s' changed. " +
                "[old, new]",
                key,
                namespace,
                change.oldValue,
                change.newValue);
        }
    });
}

let containerEl = document.getElementById("container");

React.render(
    <Provider store={store}>
        {() => <Application />}
    </Provider>,
    containerEl
);
