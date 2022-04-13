import authService from '../../services/auth';
import alertService from '../../services/alert';
import Logout from './logout';
import {render} from 'enzyme';

jest.mock('../../services/auth')

describe('<Logout />', () => {
  it ('should call auth service logout function', () => {
    let spy = jest.spyOn(authService, 'logout');
    render(<Logout />);
    expect(spy).toHaveBeenCalled();
  });
});