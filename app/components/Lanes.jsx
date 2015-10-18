import React, { Component } from "react";
import Lane from "./Lane.jsx";

class Lanes extends Component {
    render() {
        const lanes = this.props.items;

        return (
            <div className="lanes">{lanes.map(this.renderLane)}</div>
        );
    }
    renderLane(lane) {
        return <Lane className="lane" key={`lane${lane.id}`} lane={lane} />
    }
};

Lanes.propTypes = {
    items: React.PropTypes.array
};

Lanes.defaultProps = {
    items: []
};

export default Lanes;
