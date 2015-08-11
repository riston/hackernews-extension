
import "../style/base.less";

import I from "immutable";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import {incItem} from "../Action";

import Header from "./Header";
import Counter from "./Counter";
import List from "./List";

class Application extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
    }

    render ()
    {
        // Injected by connect() call:
        const { dispatch } = this.props;

        return (
            <main className="hn-main">
                <Header />
                <List items={this.props.items} />
                <Counter
                    count={this.props.count}
                    onIncClick={e => dispatch(incItem()) } />
            </main>
        );
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select (state)
{
    // TODO: Optimize the selection
    return {
        count: state.App.getIn(["count"]),
        items: state.App.getIn(["items"])
            .toArray()
            .map(x => x.toObject()),
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Application);
