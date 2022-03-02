import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"
import ResponsiveAppBar from "../components/layout/nav";

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

    it("Should have some children nodes", () => {
        act(() => {
            render(<ResponsiveAppBar />, container);
        });
        expect(container.childNodes).not.toBeNull();
    });

    it("Should have a clickable avatar button", () => {
        act(() => {
            render(<ResponsiveAppBar />, container);
        });
        const profileButton = document.querySelector("[data-testid=profileButton]");
        act(() => {
            profileButton.dispatchEvent(new MouseEvent("click", {bubbles:true}));
        });
        expect(container.textContent).toBe("Get StartedAboutHelp");
    });
});