import React from "react/addons";
import TestBackend from "react-dnd-test-backend";
import { DragDropContext } from "react-dnd";
import assert from "assert";
import Note from "app/components/Note.jsx";

const {
    renderIntoDocument
} = React.addons.TestUtils;

describe("note", () => {
    it("renders children", () => {
        const test = "test";
        const NoteContent = wrapInTestContext(Note);
        const component = renderIntoDocument(
            <NoteContent id="test">{test}</NoteContent>
        );

        assert.equal(component.props.children, test);
    });
});

// https://gaearon.github.io/react-dnd/docs-testing.html
function wrapInTestContext(DecoratedComponent) {
    @DragDropContext(TestBackend)
    class TestContextContainer extends React.Component {
        render() {
            return <DecoratedComponent {...this.props} />;
        }
    }

    return TestContextContainer;
}
