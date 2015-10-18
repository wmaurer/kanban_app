import AltContainer from 'alt/AltContainer';
import React, { Component } from 'react';
import { DropTarget } from "react-dnd";
import ItemTypes from "../constants/ItemTypes"
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';
import Editable from "./Editable.jsx";

const noteTarget = {
    hover(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;

        if (!targetProps.lane.notes.length) {
            LaneActions.attachToLane({
                laneId: targetProps.lane.id,
                noteId: sourceId
            });
        }
    }
};

@DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
class Lane extends Component {
    constructor(props) {
        super(props);

        const id = props.lane.id;

        this.addNote = this.addNote.bind(this, id);
        this.deleteNote = this.deleteNote.bind(this, id);
        this.editName = this.editName.bind(this, id);
    }
    render() {
        const { connectDropTarget, lane, ...props } = this.props;

        return connectDropTarget(
            <div {...props}>
                <div className="lane-header">
                    <Editable  className="lane-name" value={lane.name} onEdit={this.editName} />
                    <div className="lane-add-note">
                        <button onClick={this.addNote}>+</button>
                    </div>
                </div>
                <AltContainer
                    stores={[NoteStore]}
                    inject={ {
                        items: () => NoteStore.get(lane.notes) || []
                    } }
                >
                    <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
                </AltContainer>
            </div>
        );
    }
    editName(id, name) {
        if(name) {
            LaneActions.update({id, name});
        }
        else {
            LaneActions.delete(id);
        }
    }
    addNote(laneId) {
        NoteActions.create({task: 'New task'});
        LaneActions.attachToLane({laneId});
    }
    editNote(id, task) {
        NoteActions.update({id, task});
    }
    deleteNote(laneId, noteId) {
        LaneActions.detachFromLane({laneId, noteId});
        NoteActions.delete(noteId);
    }
}

Lane.propTypes = {
    lane: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string,
        notes: React.PropTypes.array
    }).isRequired,
    connectDropTarget: React.PropTypes.func
};

Lane.defaultProps = {
    name: "",
    notes: []
};

export default Lane;
