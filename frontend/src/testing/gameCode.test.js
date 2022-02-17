import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"
import GameCode from "../components/gameCode"

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
});