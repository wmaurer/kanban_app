import React from "react/addons";
import assert from "assert";
import Editable from "app/components/Editable.jsx";

const {
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    findRenderedDOMComponentWithTag,
    Simulate
} = React.addons.TestUtils;

describe("Editable", () => {
    it("renders value", () => {
        const value = "value";
        const component = renderIntoDocument(
            <Editable value={value} />
        );

        const valueComponent = findRenderedDOMComponentWithClass(component, "value");

        assert.equal(valueComponent.getDOMNode().textContent, value);
    })

    it("enters edit mode", () => {
        const value = "value";
        const component = renderIntoDocument(
            <Editable value={value} />
        );

        const valueComponent = findRenderedDOMComponentWithClass(component, "value");
        Simulate.click(valueComponent);

        const input = findRenderedDOMComponentWithTag(component, "input");

        assert.equal(input.getDOMNode().value, value);
    });

    it("triggers onEdit", () => {
        let triggered = false;
        const newValue = "value";

        const onEdit = val => {
            triggered = true;
            assert.equal(val, newValue);
        };
        const component = renderIntoDocument(
            <Editable value={'value'} onEdit={onEdit} />
        );

        const valueComponent = findRenderedDOMComponentWithClass(component, "value");
        Simulate.click(valueComponent);

        const input = findRenderedDOMComponentWithTag(component, "input");
        input.value = newValue;

        Simulate.blur(input);

        assert.equal(triggered, true);
    });

    it("allows deletion", () => {
        let deleted = false;
        const onDelete = () => {
            deleted = true;
        }

        const component = renderIntoDocument(
            <Editable value={"value"} onDelete={onDelete} />
        );

        const deleteComponent = findRenderedDOMComponentWithClass(component, "delete");
        Simulate.click(deleteComponent);

        assert.equal(deleted, true);
    });

    it("stops editing on enter", () => {
        let triggered = false;
        const newValue = "value";

        const onEdit = val => {
            triggered = true;
            console.log(val);
            assert.equal(val, newValue);
        };
        const component = renderIntoDocument(
            <Editable value={"value"} onEdit={onEdit} />
        );

        const valueComponent = findRenderedDOMComponentWithClass(component, "value");
        Simulate.click(valueComponent);

        const input = findRenderedDOMComponentWithTag(component, "input");
        input.value = newValue;

        Simulate.keyPress(input, { key: "a", keyCode: 65, which: 65 });
        assert.equal(triggered, false);

        Simulate.keyPress(input, { key: "Enter", keyCode: 13, which: 13 });
        assert.equal(triggered, true);
    });
});
