import React from 'react';
import '../../setupTests';
import GamePlayTimeout from './gamePlayTimeout';
import {shallow} from 'enzyme';
import {expect, jest} from '@jest/globals';
import {unmountComponentAtNode} from 'react-dom';
import {Button} from '@mui/material';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<GamePlayTimeout />', () => { 
  it('should have a return home button', () => {
    let wrapper = shallow(<GamePlayTimeout />);
    const input = wrapper
      .find(Button)
      .filterWhere((i) => i.prop('children') == 'Return Home');
    expect(input.getElement()).not.toBeNull();
  });
  
  it('should have a new game button', () => {
    let wrapper = shallow(<GamePlayTimeout />);
    const input = wrapper
      .find(Button)
      .filterWhere((i) => i.prop('children') == 'Start New Game');
    expect(input.getElement()).not.toBeNull();
  });
  
  it('should call props when new game button clicked', () => {
    const myFunc = jest.fn();
    let wrapper = shallow(<GamePlayTimeout newGame={myFunc} />);
    const input = wrapper
      .find(Button)
      .filterWhere((i) => i.prop('children') == 'Start New Game');
    expect(input.getElement()).not.toBeNull();
    input.simulate('click');
    expect(myFunc).toHaveBeenCalled();
  });
  
  it('should call props when return home button clicked', () => {
    const myFunc = jest.fn();
    let wrapper = shallow(<GamePlayTimeout returnHome={myFunc} />);
    const input = wrapper
      .find(Button)
      .filterWhere((i) => i.prop('children') == 'Return Home');
    expect(input.getElement()).not.toBeNull();
    input.simulate('click');
    expect(myFunc).toHaveBeenCalled();
  });
});