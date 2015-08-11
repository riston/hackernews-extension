
import "../style/item.less";
import "../style/badge.less";

import React, {Component, PropTypes} from "react";
import moment from "moment";

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
        let timeFromNow = moment(this.props.time * 1e3).fromNow();

        return (
            <div className="hn-item">
                <span className="hn-badge">{this.props.score}</span>
                <span><a href={this.props.url}>{this.props.title}</a></span>
                <span>&nbsp;({this.props.descendants}) </span>
                <div className="sub">
                    <span>&ndash; by {this.props.by}</span>
                    <span>{timeFromNow}</span>
                </div>
            </div>
        );
    }
}
