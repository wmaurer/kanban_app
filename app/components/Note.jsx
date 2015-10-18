import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "../constants/ItemTypes"

const noteSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    }
};

const noteTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;

        if (sourceId !== targetId) {
            targetProps.onMove({ sourceId, targetId });
        }
    }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
class Note extends Component {
    render() {
        const { connectDragSource, connectDropTarget, isDragging,
            id, onMove, ...props } = this.props;

        return connectDragSource(connectDropTarget(
            <li style={{
                    opacity: isDragging ? 0 : 1
                }} {...this.props}>{props.children}</li>
        ));
    }
}

Note.propTypes = {
    id: React.PropTypes.string.isRequired,
    connectDragSource: React.PropTypes.func,
    connectDropTarget: React.PropTypes.func,
    onMove: React.PropTypes.func
};

Note.defaultProps = {
    onMove: () => {}
};

export default Note;
