import React from 'react';
import '../../setupTests';
import { mount } from "enzyme";
import EndGamePlay from "../../components/game/endGamePlay";
import EndGame from "./endGame";
import { BrowserRouter } from 'react-router-dom';


const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

describe('<EndGame />', () => {
  it ('should render the EndGamePlay component', () => {
    const wrapper = mount(<BrowserRouter><EndGame /></BrowserRouter>);
    expect(wrapper.find(EndGamePlay)).toHaveLength(1);
  });
  it ('should call navigate function on return home', () => {
    const wrapper = mount(<BrowserRouter><EndGame /></BrowserRouter>);
    wrapper.find(EndGamePlay).props().returnHome();
    expect(mockedNavigate).toHaveBeenCalled();
  });
});