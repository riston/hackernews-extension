
import React, {Component, PropTypes} from "react";

export default class Counter extends Component {

    render ()
    {
        return <div>
            <span>{this.props.count}</span>
            <button onClick={this.props.onIncClick}>Inc</button>
        </div>
    }
}

Counter.propTypes = {
    count: PropTypes.number.isRequired,
    onIncClick: PropTypes.func.isRequired,
};
