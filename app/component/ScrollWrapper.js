
import React, {Component} from "react";
import IScroll from "iscroll";

export default class ScrollWrapper extends Component {

    constructor(props)
    {
        super(props);
    }

    componentDidMount ()
    {
        let el = React.findDOMNode(this.refs.wrapper);
        console.log("Did mount", this.refs.wrapper, "elem", el);

        this._IScroll = new IScroll(el);
    }

    componentDidUnmount ()
    {
        this._IScroll.destroy();
        this._IScroll = null;
    }

    render ()
    {
        return <div className="wrapper" ref="wrapper">{this.props.children}</div>;
    }
}
