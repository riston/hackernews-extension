
import "../style/base.less"

import React, {Component, PropTypes} from "react";
import { connect } from "react-redux";

import {incItem} from "../Action";

import Header from "./Header";
import Counter from "./Counter";

class Application {

    render ()
    {
        // Injected by connect() call:
        const { dispatch } = this.props;

        return <main className="hn-main">
            <Header />
            <Counter count={this.props.count} onIncClick={e => dispatch(incItem()) } />
        </main>
    }
}

Application.propTypes = {

    count: PropTypes.number.isRequired,
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select (state)
{
    // TODO: Optimize the selection
    return {
        count: state.App.getIn(["count"])
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Application);
