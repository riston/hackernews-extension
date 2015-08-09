
import React, {Component, PropTypes} from "react";

export default class Item extends Component {

    static propTypes = {
        id:          PropTypes.number.isRequired,
        title:       PropTypes.string.isRequired,
        url:         PropTypes.string.isRequired,
        time:        PropTypes.number.isRequired,
        by:          PropTypes.string.isRequired,
        score:       PropTypes.number.isRequired,
        descendants: PropTypes.number.isRequired,
    }

    render ()
    {
        return (
            <div>
                <span><a href={this.props.url}>{this.props.title}</a></span>
                by <span>{this.props.by}</span>
                @ <span>{this.props.time}</span>
                <span>[{this.props.score}]</span>
                <span>Comments {this.props.descendants}</span>
            </div>
        );
    }
}
