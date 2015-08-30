
import "../style/footer.less";

import React, {Component, PropTypes} from "react";

export default class Header extends Component {

    render ()
    {
        let githubURL = "https://github.com/riston/hackernews-extension";

        return (
            <footer className="hn-footer">
                <div>&copy; {new Date().getFullYear()} <a href={githubURL}>Risto</a></div>
            </footer>
        );
    }
}
