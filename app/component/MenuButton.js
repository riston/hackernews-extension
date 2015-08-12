
import "../style/menu-button.less";

import React, {Component, PropTypes} from "react";
import CN from "classnames";

export default class MenuButton extends Component {

    static propTypes = {
        icon:   PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
    }

    static defaultProps = {
        icon:   "fa-cog",
        action: "default-action"
    }

    render ()
    {
        let classes = CN("fa fa-fw", {
            [this.props.icon]: true
        });

        return <button className="hn-button">
            <i className={classes} data-action={this.props.action}></i>
        </button>
    }
}
