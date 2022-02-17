import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"
import Home from "../components/home"
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

describe("<Home />", () => {
    it("Should have correct text content", () => {
        act(() => {
            render(<Home />, container);
        });
        expect(container.textContent).toBe("Get StartedAboutHelpTo join a game, enter your 6-digit game code:Game CodeGame CodeJoin GameCopyright © Ethics Adventure 2022.");
    });
});