
import "../style/item.less";

import React, {Component, PropTypes} from "react";
import moment from "moment";

export default class CommentItem extends Component {

    static propTypes = {
        id:     PropTypes.number.isRequired,
        text:   PropTypes.string.isRequired,
        type:   PropTypes.string.isRequired,
        time:   PropTypes.number.isRequired,
        by:     PropTypes.string.isRequired,
        parent: PropTypes.number.isRequired,
        kids:   PropTypes.array.isRequired,
    }

    static defaultProps = {
        text: "No comments text added",
        by:   "Unkown",
        kids: [],
    }

    render ()
    {
        let timeFromNow = moment(this.props.time * 1e3).fromNow();

        // TODO: Make sure to add DOMPurify module to clean the comments text
        // before, currently using direct html render which is not XSS safe
        return (
            <div className="hn-item">
                <div className="text">
                    <span className="title"
                        dangerouslySetInnerHTML={{ __html: this.props.text }} />
                    <span>{this.props.kids.length}</span>
                </div>
                <div className="sub">
                    <span>&ndash; by {this.props.by}</span>
                    <span>&nbsp;{timeFromNow}</span>
                </div>
            </div>
        );
    }
}
