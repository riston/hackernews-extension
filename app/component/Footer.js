
import "../style/footer.less";

import React, {Component, PropTypes} from "react";

export default class Header extends Component {

    render ()
    {
        let year = new Date().getFullYear();
        let githubURL = "https://github.com/riston/hackernews-extension";

        return (
            <footer className="hn-footer">
                <div>&copy; {year} Risto, <a href={githubURL}>source code</a></div>
            </footer>
        );
    }
}
