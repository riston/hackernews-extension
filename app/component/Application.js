
import "../style/base.less"

import I from "immutable";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import {incItem} from "../Action";

import Header from "./Header";
import Counter from "./Counter";

class Item extends Component {

    static propTyppes = {
        id:          PropTypes.number.isRequired,
        title:       PropTypes.string.isRequired,
        url:         PropTypes.string.isRequired,
        time:        PropTypes.number.isRequired,
        by:          PropTypes.string.isRequired,
        score:       PropTypes.number.isRequired,
        descendants: PropTypes.number.isRequired,
    }

    render ()
    {
        return (
            <div className="hn-fade">
                <span><a href={this.props.url}>{this.props.title}</a></span>
                by <span>{this.props.by}</span>
                @ <span>{this.props.time}</span>
                <span>[{this.props.score}]</span>
                <span>Comments {this.props.descendants}</span>
            </div>
        );
    }
}

class List extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
    }

    render ()
    {
        return (
            <div>{this.renderItems()}</div>
        );
    }

    renderItems ()
    {
        return this.props.items.map(item => {
            return <Item key={item.id} {...item} />
        });
    }
}

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
                <Counter count={this.props.count} onIncClick={e => dispatch(incItem()) } />
                <List items={this.props.items} />
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
