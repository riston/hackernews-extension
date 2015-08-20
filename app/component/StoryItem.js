
import "../style/item.less";

import React, {Component, PropTypes} from "react";
import moment from "moment";

import Badge from "./Badge";

export default class StoryItem extends Component {

    static propTypes = {
        id:          PropTypes.number.isRequired,
        type:        PropTypes.oneOf(["story", "comment", "job", "poll"]).isRequired,
        title:       PropTypes.string.isRequired,
        url:         PropTypes.string.isRequired,
        time:        PropTypes.number.isRequired,
        by:          PropTypes.string.isRequired,
        score:       PropTypes.number.isRequired,
        descendants: PropTypes.number.isRequired,
    }

    static defaultProps = {
        score: 0,
        title: "No news title",
        descendants: [],
    }

    render ()
    {
        let timeFromNow = moment(this.props.time * 1e3).fromNow();

        return (
            <div className="hn-item">
                <div className="text">
                    <Badge score={this.props.score} />
                    <span className="title">
                        <a href={this.props.url} target="_blank">{this.props.title}</a>
                        <button className="comment-count"
                            data-action="comment-view"
                            data-item-id={this.props.id}>{`(${this.props.descendants})`}
                        </button>
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
