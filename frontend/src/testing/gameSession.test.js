import React from "react"
import GameSession from "../components/gameSession"
import { shallow } from "enzyme"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/gameSession",
      code: '123456',
    game: [
        {
            "id": '1',
            'text': "This is the question itself",
            "password": "psw",
            "onlyChance": false,
            "options": [
                {
                "text": "Option 1",
                "link": "1a"
                    },
                    {
                        "text": "Option 2",
                        "link": "1b"
                    }
                ],
        }
    ],
    formValue: null
    })
  })); 

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

describe("<GameSession />", () => {
    it("should render", () => {
      shallow(<BrowserRouter>
        <Routes>   
            <Route path="*" element= {<GameSession />}/>
        </Routes>
    </BrowserRouter>);
    });
        it("Should have correct text content", () => {
            act(() => {
                render(<BrowserRouter>
                    <Routes>   
                        <Route path="*" element= {<GameSession />}/>
                    </Routes>
                </BrowserRouter>, container);
            });
            expect(container.textContent).toBe("Game Code: No Game Code Question: Game not foundContinue");
        });
  });