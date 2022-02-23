import React from "react"
import ExampleComponent from "./ExampleComponent"
import { shallow } from "enzyme"

const mockUseLocationValue = {
    pathname: "/testroute",
    search: '',
    hash: '',
    state: null
}
jest.mock('react-router', () => ({
    ...jest.requireActual("react-router") as {},
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    })
}));