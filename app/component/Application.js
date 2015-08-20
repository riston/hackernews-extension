
import "../style/base.less";

import I from "immutable";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import {loadComments, setView, setActiveItem} from "../Action";
import {loadCommentsExt} from "../ChromeExt";

import Default from "./view/Default";
import Comment from "./view/Comment";

import Header from "./Header";
import Footer from "./Footer";
import Counter from "./Counter";
import List from "./List";

class Application extends Component {

    static propTypes = {
        activeView: PropTypes.string.isRequired,
        count:      PropTypes.number.isRequired,
        items:      PropTypes.array.isRequired,
    }

    render ()
    {
        // Injected by connect() call:
        const { dispatch, activeView } = this.props;

        return (
            <main className="hn-main" onClick={this._onClick.bind(this)}>
                <Header />
                {this.renderView(activeView, this.props)}
                <Footer />
            </main>
        );
    }

    renderView (view = "default", props)
    {
        // TODO: Refactor the if statement
        if (view === "comment")
        {
            return <Comment
                storyItem={props.activeItem}
                comments={props.comments} />
        }
        else
        {
            return <Default items={props.items} />
        }
    }

    _onClick (e)
    {
        const { dispatch } = this.props;
        let dataset = e.target.dataset;
        let action = dataset.action;

        // The back action should return on default page
        if (action === "back")
        {
            console.log("Change the view to default");
            dispatch(setView("default"));
        }
        else if (action === "comment-view")
        {
            let itemID = dataset.itemId;

            // Could this be dispatched once ?
            loadCommentsExt(itemID)
                .then(comments =>
                {
                    dispatch(setView("comment"))
                    dispatch(setActiveItem(itemID));

                    dispatch(loadComments(comments));
                }).catch(e =>
                {
                    console.error("Failed to load comments ", itemID, e);
                })
        }
        else
        {
            console.log("Unhandled click on the component", action, e);
        }
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select (state)
{
    let activeItemID = state.App.get("activeItemID");

    // TODO: Optimize the selection
    return {
        activeItemID: activeItemID,
        activeView:   state.App.get("activeView"),
        activeItem:   state.App.getIn(["items", activeItemID])
            .toObject(),
        count:        state.App.get("count"),
        comments:     state.App.get("comments"),
        items:        state.App.get("items")
            .toArray()
            .map(x => x.toObject()),
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Application);
