
import React, {Component, PropTypes} from "react";

import List from "../List";

export default class Default extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired
    }

    render ()
    {
        // Injected by connect() call:
        // const { dispatch } = this.props;

        return (
            <List items={this.props.items} />
        );
    }
}
