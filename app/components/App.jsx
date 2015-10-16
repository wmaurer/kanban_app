import AltContainer from "alt/AltContainer";
import React, { Component } from "react";
import Notes from "./Notes.jsx";
import NoteActions from "../actions/NoteActions";
import NoteStore from "../stores/NoteStore";
import connectToStores from "alt/utils/connectToStores";

export default class App extends Component {
    render() {
        const notes = this.props.notes;

        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <AltContainer
                    stores={[NoteStore]}
                    inject={ {
                        items: () => NoteStore.getState().notes
                    } }
                >
                    <Notes items={notes}
                        onEdit={this.editNote}
                        onDelete={this.deleteNote} />
                </AltContainer>
            </div>
        );
    }
    addNote() {
        NoteActions.create({task: 'New task'});
    }
    editNote(id, task) {
        NoteActions.update({id, task});
    }
    deleteNote(id) {
        NoteActions.delete(id);
    }
}
