import React from 'react';
import '../../setupTests';
import {shallow, mount, render} from 'enzyme';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import Wheel from './theWheel';
import {getByTestId} from '@testing-library/react';

describe('<Wheel />', () => {
    let wrapper;
    const mockCall = jest.fn();
    HTMLCanvasElement.prototype.getContext = jest.fn();
    beforeEach(async () => { 
        await act( async () => {
            wrapper = mount(
                <Wheel data={{weight:{1: .5, 1:.5}, selected: 0, callBack: mockCall}} />
            )
        });
      });

    it('should render', () => {
        expect(shallow(
              <Wheel data={{weight:{1: .5, 1:.5}, selected: 0, callBack: mockCall}}/>
        ));
        });
    it('button should call spin', () => {
        console.log(wrapper.debug());
        wrapper.find('spin').hostNodes().simulate('click');
        expect(Wheel.click).toHaveBeenCalled();
        });
});