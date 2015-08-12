
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
            "#404040": { min: 0, max: 50 },
            "#7BC8A4": { min: 51, max: 100 },
            "#4CC3D9": { min: 101, max: 200 },
            "#FFC65D": { min: 201, max: 300 },
            "#F16745": { min: 301, max: 400 },
        };

        Object.keys(colorMap).forEach(color => {

            let {min, max} = colorMap[color];

            if (this._between(score, min, max))
            {
                defaultColor = color;
            }
        });

        // // Example score ranges
        // // < 10       => #404040
        // // 10 - 30    => #7BC8A4
        // // 30 - 50    => #4CC3D9
        // // 50 - 100   => #FFC65D
        // // > 100      => #F16745
        // if (this._between(0, 10))
        // {
        //     return "#404040";
        // }

        // if (this._between(10, 30))
        // {
        //     return "#FFC65D";
        // }

        // if (this._between(30, 50))
        // {
        //     return "#4CC3D9";
        // }

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

