
import "../style/badge.less";

import React, {Component, PropTypes} from "react";

export default class Application extends Component {

    static propTypes = {
        score: PropTypes.number.isRequired,
    }

    getColor (score)
    {
        let defaultColor = "#993366";

        let colorMap = {
            "#FF7C00": { min: 0, max: 50 },
            "#CD6400": { min: 51, max: 100 },
            "#3D60D2": { min: 101, max: 200 },
            "#07268B": { min: 201, max: 300 },
            "#009B22": { min: 301, max: 400 },
        };

        Object.keys(colorMap).forEach(color => {

            let {min, max} = colorMap[color];

            if (this._between(score, min, max))
            {
                defaultColor = color;
            }
        });

        return defaultColor;
    }

    _between (x, min, max) {
        return x >= min && x <= max
    }

    render ()
    {
        let score = this.props.score;
        let color = this.getColor(score);
        let styles = {
            backgroundColor: color
        }

        return <span className="hn-badge" style={styles}>{score}</span>;
    }
}

