import React from 'react';
import '../../setupTests';
import Knowledge from "./knowledge";
import {render} from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

describe('<Knowledge />', () => {
  let comp = null;
  beforeEach(() => {
    comp = render(<BrowserRouter><Knowledge /></BrowserRouter>);
  });
  it ('should render', () =>{
    expect(comp).not.toBeNull();
  });
});