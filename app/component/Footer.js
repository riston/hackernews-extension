
import "../style/footer.less";

import React, {Component, PropTypes} from "react";

export default class Header extends Component {

    render ()
    {
        return (
            <footer className="hn-footer">
                <div>&copy; {new Date().getFullYear()} Risto</div>
            </footer>
        );
    }
}
