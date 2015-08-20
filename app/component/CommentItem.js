
import "../style/item.less";

import React, {Component, PropTypes} from "react";
import moment from "moment";

export default class CommentItem extends Component {

    static propTypes = {
        id:          PropTypes.number.isRequired,
        title:       PropTypes.string.isRequired,
        time:        PropTypes.number.isRequired,
        by:          PropTypes.string.isRequired,
        score:       PropTypes.number.isRequired,
        descendants: PropTypes.number,
    }

    // static defaultProps = {
    //     score: 0,
    //     title: "No news title",
    //     descendants: [],
    // }

    render ()
    {
        let timeFromNow = moment(this.props.time * 1e3).fromNow();

        return (
            <div className="hn-item">
                <div className="text">
                    <span className="title">
                        {this.props.title}
                    </span>
                </div>
                <div className="sub">
                    <span>&ndash; by {this.props.by}</span>
                    <span>&nbsp;{timeFromNow}</span>
                </div>
            </div>
        );
    }
}
