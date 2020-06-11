import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatusComponent", () => {
    test("status from props should be in the state)", () => {
        const component = create(<ProfileStatus status="it-kam" />);
        const instance:any = component.getInstance();
        expect(instance.state.status).toBe("it-kam");
    });
    test(`after creation <span> should be displayed with correct status`, () => {
        const component = create(<ProfileStatus status="it-kam" />);
        const root:any = component.root;
        let span = root.findByType("span")
        expect(span.length).not.toBeNull();
    });

    test(`after creation <input> shouldn't be displayed with correct status`, () => {
        const component = create(<ProfileStatus status="it-kam" />);
        const root:any = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("it-kam");
    });

    test(`input should be displayed in EditMode instead of span`, () => {
        const component = create(<ProfileStatus status="it-kam" />);
        const root:any = component.root;
        let span = root.findByType("span")
        span.props.onDoubleClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe("it-kam");
    });
});