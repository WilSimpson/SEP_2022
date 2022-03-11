import {afterAll, afterEach, beforeEach, expect} from '@jest/globals';
import {mount, shallow} from 'enzyme';
import {User} from '../../models/user.model';
import GamesTable from './GamesTable';
import {TableContainer, TableRow} from '@mui/material';
import {waitFor} from '@testing-library/dom';

const mockUseNavigate = jest.fn();
const mockUseParams = jest.fn();
const mockUseHistory = jest.fn();
jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

// jest.mock('react-router-dom', () => {
//   // Require the original module to not be mocked...
//   const originalModule = jest.requireActual('react-router-dom');

//   return {
//     __esModule: true,
//     ...originalModule,
//     useParams: mockUseParams,
//     useHistory: mockUseHistory,
//     useNavigate: mockUseNavigate
//   };
// });

const games = [
  {
    title: 'My Title',
    active: false,
    questions: [{id: 1}],
    options: [{id: 2}],
    code: 123412,
  },
  {
    title: 'My Title 1',
    active: true,
    questions: [{id: 10}],
    options: [{id: 29}],
    code: 123413,
  },
  {
    title: 'My Title 2',
    active: false,
    questions: [{id: 18}],
    options: [{id: 27}],
    code: 123415,
  },
  {
    title: 'My Title 3',
    active: false,
    questions: [{id: 16}],
    options: [{id: 25}],
    code: 123416,
  },
  {
    title: 'My Title 4',
    active: true,
    questions: [{id: 14}],
    options: [{id: 23}],
    code: 123419,
  },
  {
    title: 'My Title 5',
    active: true,
    questions: [{id: 11}],
    options: [{id: 22}],
    code: 223412,
  },
];

const user = new User(
    'email@example.com',
    'FirstName',
    'LastName',
    'ADMIN',
    'token',
    1,
);

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
});

describe('<GamesTable />', () => {
  let comp = null;

  describe('given no games', () => {
    beforeAll(() => {
      comp = mount(<GamesTable />);
    });

    it('should be a games table', () => {
      const input = comp.find(TableContainer);
      expect(input.length).toEqual(1);
    });

    it('should show no games', () => {
      const rows = comp
          .find(TableRow)
          .filterWhere((i) => i.prop('className') == 'game-row');
      expect(rows.length).toEqual(0);
    });

    afterAll(() => {
      comp.unmount();
    });
  });
});
