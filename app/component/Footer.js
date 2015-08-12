
import "../style/footer.less";

import React, {Component, PropTypes} from "react";

export default class Header extends Component {

    render ()
    {
        return (
            <footer className="hn-footer">
                <p>&copy; {new Date().getFullYear()} Risto</p>
            </footer>
        );
    }
}
