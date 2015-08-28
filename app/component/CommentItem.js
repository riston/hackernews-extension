
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
        let text = "No text set";
        let color = this.hash(this.props.parent);
        let style = {};
        let moreButton;

        if (this.props.kids.length > 0)
        {
            let { r, g, b } = {
                r: (color >> 16) & 0xFF,
                g: (color >> 8) & 0xFF,
                b: color & 0xFF,
            };

            style = {
                borderLeft: "1ex solid",
                borderLeftColor: `rgb(${r},${g},${b})`,
            };

            text = `More (${(this.props.kids || 0).length})`;

            moreButton = <a href={ "#" + this.props.id}
                data-action="child-comments"
                data-children={JSON.stringify(this.props.kids)}>{text}</a>;
        }

        // TODO: Make sure to add DOMPurify module to clean the comments text
        // before, currently using direct html render which is not XSS safe
        return (
            <div className="hn-item hn-comment" style={style}>
                <div className="text">
                    <span className="title"
                        dangerouslySetInnerHTML={{ __html: this.props.text }} />
                </div>
                <div className="sub">
                    {moreButton}&nbsp;
                    <span>&ndash; by {this.props.by}</span>
                    <span>&nbsp;{timeFromNow}</span>
                </div>
            </div>
        );
    }

    hash (x)
    {
        x = ((x >> 16) ^ x) * 0x45d9f3b;
        x = ((x >> 16) ^ x) * 0x45d9f3b;
        x = ((x >> 16) ^ x);
        return x;
    }
}
