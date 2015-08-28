
import R from "ramda";
import React, {Component, PropTypes} from "react";

import List from "../List";

export default class Comment extends Component {

    static propTypes = {
        storyItem: PropTypes.object.isRequired,
        comments:  PropTypes.array.isRequired,
    }

    /**
     * Order the comments based as they appeared and the child parent relation.
     *
     * @param {Array} items Objects
     * @param {Array} IDs keys of the object map
     *
     * @return {Array} with the item objects
     */
    traverse (items, IDs)
    {
        let stack = IDs || [];
        let result = [];

        while (stack.length > 0)
        {
            // Take the first id from stack
            let id = stack.shift();
            let item = R.find(R.propEq("id", id))(items);

            // No item found
            if (!item)
            {
                continue;
            }

            result.push(item);
            let kids = item.kids || [];

            // Put the new comment ids first
            stack = kids.concat(stack);
        }

        return result;
    }

    render ()
    {
        // Reorder
        let initKids = this.props.storyItem.kids;
        let comments = this.traverse(this.props.comments, initKids);

        let items = [].concat([this.props.storyItem], comments);

        return (
            <List items={items} />
        );
    }
}
