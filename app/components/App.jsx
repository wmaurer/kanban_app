import React, { Component } from "react";
import Notes from "./Notes.jsx";
import NoteActions from "../actions/NoteActions";
import NoteStore from "../stores/NoteStore";
import connectToStores from "alt/utils/connectToStores";

@connectToStores
export default class App extends Component {
    static getStores() {
        return [NoteStore];
    }
    static getPropsFromStores(props) {
        return NoteStore.getState();
    }
    render() {
        const notes = this.props.notes;

        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <Notes items={notes}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote} />
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
