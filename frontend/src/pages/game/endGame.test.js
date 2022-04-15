import { ExpansionPanelActions } from "@material-ui/core";
import { mount } from "enzyme";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import EndGamePlay from "../../components/game/endGamePlay";
import EndGame from "./endGame";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

describe('<EndGame />', () => {
  it ('should render the EndGamePlay component', () => {
    const wrapper = mount(<EndGame />);
    expect(wrapper.find(EndGamePlay)).toHaveLength(1);
  });
  it ('should call navigate function on return home', () => {
    const wrapper = mount(<EndGame />);
      wrapper.find(EndGamePlay).props().returnHome();
      expect(mockedNavigate).toHaveBeenCalled();
  });
});