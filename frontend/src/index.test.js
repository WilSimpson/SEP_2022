import ReactDOM from 'react-dom';
import {expect, jest} from '@jest/globals';

jest.mock('react-dom');

describe('index.js', () => {
  it ('should render the project', () => {
    require('./index.js');
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
