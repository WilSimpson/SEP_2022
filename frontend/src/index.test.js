import './setupTests';
import ReactDOM from 'react-dom';


jest.mock('react-dom');

describe('index.js', () => {
  it ('should render the project', () => {
    require('./index.js');
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
