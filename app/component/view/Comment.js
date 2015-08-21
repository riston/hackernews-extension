
import React, {Component, PropTypes} from "react";

import List from "../List";

export default class Comment extends Component {

    static propTypes = {
        storyItem: PropTypes.object.isRequired,
        comments:  PropTypes.array.isRequired,
    }

    render ()
    {
        console.log("Comments", this.props.comments, "Item", this.props.storyItem);

        let items = [].concat([this.props.storyItem], this.props.comments);

        return (
            <List items={items} />
        );
    }
}
