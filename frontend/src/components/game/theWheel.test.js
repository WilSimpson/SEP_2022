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
    beforeEach(async () => { 
        await act( async () => {
            wrapper = mount(
                <Wheel data={{weight:{1: .5, 1:.5}, selected: 0, callBack: mockCall}} />
            )
        });
      });

    it('should render', () => {
        expect(mount(
              <Wheel data={{weight:{1: .5, 1:.5}, selected: 0, callBack: mockCall}}/>
        ));
        });
    it('button should call spin', () => {
        jest.useFakeTimers();
        const stateSpy = jest.spyOn(wrapper.instance(), 'setState');
        const resultSpy = jest.spyOn(wrapper.instance(), 'getResult');
        wrapper.instance().spin();
        //wrapper.find({'id': 'spin'}).hostNodes().simulate('click');
        expect(stateSpy).toHaveBeenCalledWith({
            rotate: expect.any(Number),
            easeOut: 2,
            spinning: true,
          });
        jest.advanceTimersByTime(3000);
        expect(resultSpy).toHaveBeenCalled()
        });
});
