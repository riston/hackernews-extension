
import React, {Component, PropTypes} from "react";

import MenuButton from "./MenuButton";

export default class Header extends Component {

    render ()
    {
        return (
            <header onClick={this._onClick}>
                <section>
                    <a href="#">
                        <h1 data-action="back">HackerNews Reader</h1>
                    </a>
                </section>
                <section>
                    {this.props.activeView !== "default" ?
                        <MenuButton icon="fa-arrow-left" action="back" className="pulse" /> : null }
                    <MenuButton icon="fa-refresh" action="refresh-list" />
                    <MenuButton icon="fa-cog" action="setting-view" />
                </section>
            </header>
        );
    }
}
