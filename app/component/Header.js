
import "../style/menu-button.less";

import React, {Component, PropTypes} from "react";
import CN from "classnames";

class MenuButton extends Component {

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

export default class Header extends Component {

    render ()
    {
        return (
            <header onClick={this._onClick}>
                <section>
                    <h1>HackerNews application</h1>
                </section>
                <section>
                    <MenuButton icon="fa-refresh" action="refresh-list" />
                    <MenuButton icon="fa-cog" action="open-settings" />
                </section>
            </header>
        );
    }

    _onClick (e)
    {
        console.log("Clicked on", e.target.dataset.action);
    }
}
