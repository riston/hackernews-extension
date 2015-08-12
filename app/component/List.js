
import "../style/list.less";
import React, {Component, PropTypes} from "react";

import Item from "./Item";

export default class List extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
    }

    render ()
    {
        return (
            <div className="hn-list">
                {this.renderItems()}
            </div>
        );
    }

    renderItems ()
    {
        return this.props.items.map(item => {
            return <Item key={item.id} {...item} />
        });
    }
}
