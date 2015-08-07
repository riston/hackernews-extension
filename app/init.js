
import React from "react";
import Immutable from "immutable";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as reducers from "./Reducer";

import HNFirebase from "./HNFirebase";
import {addItem} from "./Action";
import Application from "./component/Application";

const initState = {
    App: Immutable.fromJS({
        count: 15,
        items: { },
    })
};

// Base url for the HN API
const NEWS_URL = "https://hacker-news.firebaseio.com/v0/";

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, initState);

// HackerNews firebase API
let fireRef = new HNFirebase(NEWS_URL);
fireRef.addListeners();
fireRef.on("item", item =>
{
    store.dispatch(addItem(item));
});

let containerEl = document.getElementById("container");

React.render(
    <Provider store={store}>
        {() => <Application />}
    </Provider>,
    containerEl
);
