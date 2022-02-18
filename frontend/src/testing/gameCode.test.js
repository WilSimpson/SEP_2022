import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import GameCode from "../components/gameCode";
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("<GameCode />", () => {
    it("Should have correct text content", () => {
        act(() => {
            render(<GameCode />, container);
        });
        expect(container.textContent).toBe("Game CodeGame CodeJoin Game");
    });

    it("Should correctly catch a gamecode that is too short", () => {
        act(() => {
            render(<GameCode />, container);
        });
        const submitButton = document.querySelector("[data-testid=submitButton]");
        const codeBox = document.querySelector("[data-testid=codeBox]");
        expect(codeBox).toBeInTheDocument();
        console.log(codeBox);
        expect(codeBox.value).toBe("");
        act(() => {
            userEvent.type(codeBox, "123");
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles:true}));
        });
        //expect(codeBox).toHaveValue("123456");
        expect(container.textContent).toBe("This Gamecode is not valid. Gamecodes must be six digits long.Game CodeGame CodeJoin Game");
    });

    it("Should correctly catch an empty gamecode", () => {
        act(() => {
            render(<GameCode />, container);
        });
        const submitButton = document.querySelector("[data-testid=submitButton]");
        act(() => {
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles:true}));
        });
        expect(container.textContent).toBe("This Gamecode is not valid. Gamecodes must be six digits long.Game CodeGame CodeJoin Game");
    });
});