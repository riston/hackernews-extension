
import React from "react";
import Immutable from "immutable";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as reducers from "./Reducer"

import Application from "./component/Application";

const initState = {
    App: Immutable.fromJS({ count: 15 })
};

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, initState);

let containerEl = document.getElementById("container");

React.render(
    <Provider store={store}>
        {() => <Application />}
    </Provider>,
    containerEl
);
