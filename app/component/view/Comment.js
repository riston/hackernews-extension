
import React, {Component, PropTypes} from "react";

import List from "../List";

export default class Comment extends Component {

    static propTypes = {
        itemID: PropTypes.string.isRequired
    }

    render ()
    {

        return (
            <div>Display the comments for item {this.props.itemID}</div>
        );
    }
}
