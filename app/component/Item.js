
import "../style/item.less";

import React, {Component, PropTypes} from "react";
import moment from "moment";

import StoryItem from "./StoryItem";
import CommentItem from "./CommentItem";
import Badge from "./Badge";

export default class Item extends Component {

    static propTypes = {
        id:   PropTypes.number.isRequired,
        type: PropTypes.oneOf(["story", "comment", "job", "poll"]).isRequired,
    }

    render ()
    {
        let type = this.props.type;
        let ItemRender = StoryItem;

        if (type === "story")
        {
            ItemRender = StoryItem;
        }
        else if (type === "comment")
        {
            ItemRender = CommentItem;
        }

        return <ItemRender {...this.props} />;
    }
}
