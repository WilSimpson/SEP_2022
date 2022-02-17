import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"
import ResponsiveAppBar from "../components/nav";

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

describe("<ResponsiveAppBar />", () => {
    it("Should have links", () => {
        act(() => {
            render(<ResponsiveAppBar />, container);
        });
        expect(container.textContent).toBe("Get StartedAboutHelp");
    });
});