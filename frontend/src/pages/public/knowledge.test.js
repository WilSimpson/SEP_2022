import React from 'react';
import '../../setupTests';
import Knowledge from "./knowledge";
import {render} from 'enzyme';



describe('<Knowledge />', () => {
  let comp = null;
  beforeEach(() => {
    comp = render(<Knowledge />);
  });
  it ('should have correct text content', () =>{
    expect(comp.text()).toContain('How to play a game:');
    expect(comp.text()).toContain('1.) Scan a QR code given to you by the game host');
    expect(comp.text()).toContain('2.) Enter the asked for info');
    expect(comp.text()).toContain('3.) Answer the question');
    expect(comp.text()).toContain('4.) Read the Result');
    expect(comp.text()).toContain('5.) Proceed to given location and enter code if necessary');
    expect(comp.text()).toContain('6.) Repeat until game is over');

  });
});