

import React, {Component, PropTypes} from "react";

import MenuButton from "./MenuButton";

export default class Header extends Component {

    render ()
    {
        return (
            <header onClick={this._onClick}>
                <section>
                    <h1>HackerNews application</h1>
                </section>
                <section>
                    <MenuButton icon="fa-arrow-left" action="back" />
                    <MenuButton icon="fa-refresh" action="refresh-list" />
                    <MenuButton icon="fa-cog" action="setting-view" />
                </section>
            </header>
        );
    }

    _onClick (e)
    {
        console.log("Clicked on", e.target.dataset.action);
    }
}
