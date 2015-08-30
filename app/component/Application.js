
import "../style/base.less";

import I from "immutable";
import R from "ramda";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import * as Action from "../Action";
import {loadCommentsExt, loadItemByIDExt} from "../ChromeExt";

import Default from "./view/Default";
import Comment from "./view/Comment";
import Setting from "./view/Setting";

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
                <Header activeView={activeView} />
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
        else if (view === "setting")
        {
            return <Setting />
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
            dispatch(Action.setView("default"));
            dispatch(Action.clearComments());
        }
        else if (action === "comment-view")
        {
            this._onCommentView(dataset.itemId)
        }
        else if (action === "setting-view")
        {
            dispatch(Action.setView("setting"));
        }
        else if (action === "child-comments")
        {
            let commentIDs = [];
            try {
                commentIDs = JSON.parse(dataset.children);
            }
            catch (e) {
                console.error("Invalid comment IDs input", e);
            }

            console.log("Load the child comments also", commentIDs);
            this._loadChildComments(commentIDs);
        }
        else
        {
            console.log("Unhandled click on the component", action, e);
        }
    }

    _onCommentView (itemID)
    {
        const { dispatch } = this.props;

        // Could this be dispatched once ?
        loadCommentsExt(itemID)
            .then(comments =>
            {
                dispatch(Action.setView("comment"))
                dispatch(Action.setActiveItem(itemID));

                // Could not convert the object into immutable data structure,
                // because of the different context "created in background"
                // https://github.com/facebook/immutable-js/pull/452
                let action = R.compose(Action.loadComments, I.fromJS, R.clone);
                dispatch(action(comments));

            }.bind(this))
            .catch(e =>
            {
                console.error("Failed to load comments ", itemID, e);
            })
    }

    _loadChildComments (commentIDs)
    {
        const { dispatch } = this.props;

        // This needs optimization
        if (!Array.isArray(commentIDs))
        {
            console.error("Comment IDs must be array");
            return;
        }


        let commentPromises = commentIDs.map(id => loadItemByIDExt(id));

        Promise.all(commentPromises)
            .then(comments =>
            {
                var commentObj = comments.reduce((prev, current) =>
                {
                    prev[current.id] = current;
                    return prev;
                }, {});

                let action = R.compose(Action.loadComments, I.fromJS, R.clone);
                dispatch(action(commentObj));
            })
            .catch(e =>
            {
                console.error("Could not load child comments", e);
            });
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select (state)
{
    let activeItemID = state.App.get("activeItemID");

    let byTime = function (x) { return x.get("time"); };

    let byParent = function (x) { return x.get("parent"); };

    // TODO: Optimize the selection
    return {
        activeItemID: activeItemID,
        activeView:   state.App.get("activeView"),
        activeItem:   state.App.getIn(["items", activeItemID])
            .toJS(),
        count:        state.App.get("count"),
        comments:     state.App.get("comments")
            .sortBy(byTime)
            .reverse()
            // .groupBy(byParent)
            .toArray()
            .map(x => x.toJS()),
        items:        state.App.get("items")
            .sortBy(byTime)
            .reverse()
            .toArray()
            .map(x => x.toJS()),
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Application);
