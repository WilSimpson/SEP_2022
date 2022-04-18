import React from 'react';
import '../../setupTests';
import {afterAll, afterEach, beforeEach, expect} from '@jest/globals';
import {mount} from 'enzyme';
import {User} from '../../models/user';
import GamesTable from './gamesTable';
import {TableContainer, TablePagination, TableRow, Dialog, Autocomplete} from '@mui/material';
import { act } from 'react-dom/test-utils';

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
    id: 1,
    title: 'My Title',
    active: false,
    questions: [{id: 1}],
    options: [{id: 2}],
    code: 123412,
  },
  {
    id: 2,
    title: 'My Title 1',
    active: true,
    questions: [{id: 10}],
    options: [{id: 29}],
    code: 123413,
  },
  {
    id: 3,
    title: 'My Title 2',
    active: false,
    questions: [{id: 18}],
    options: [{id: 27}],
    code: 123415,
  },
  {
    id: 4,
    title: 'My Title 3',
    active: false,
    questions: [{id: 16}],
    options: [{id: 25}],
    code: 123416,
  },
  {
    id: 5,
    title: 'My Title 4',
    active: true,
    questions: [{id: 14}],
    options: [{id: 23}],
    code: 123419,
  },
  {
    id: 6,
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

  describe('handle page and page size changes', () => {
    it ('should set page size', () => {
      let wrapper = mount(<GamesTable />);
      act(() => {wrapper.find(TablePagination).props().onRowsPerPageChange({target:{value: 1}})});
      wrapper.update();
      expect(wrapper.find(TablePagination).props().rowsPerPage).toBe(1);
    });

    it ('should change current page', () => {
      let wrapper = mount(<GamesTable />);
      act(() => {wrapper.find(TablePagination).props().onRowsPerPageChange({target:{value: 0}})});
      act(() => {wrapper.find(TablePagination).props().onPageChange({target: {value: ''}}, 1)});
      wrapper.update();
      expect(wrapper.find(TablePagination).props().page).toBe(1);
    });
  });

  describe('close confirmation', () => {
    it('dialog should exist', () => {
      let myFn = jest.fn();
      let wrapper = mount(<GamesTable editable data={games} onGameSelected={myFn}/>);
      wrapper.find('#delete5').hostNodes().simulate('click');
      wrapper.update();
      expect(wrapper.find('#confirm-dialog').exists()).toBe(true);
    });

    it ('should call prop function onConfirmDelete when user chose PermanentDelete', () => {
      let onGameSelected = jest.fn();
      let onConfirmDelete = jest.fn();
      let wrapper = mount(<GamesTable editable data={games} onGameSelected={onGameSelected} onConfirmDelete={onConfirmDelete}/>);
      wrapper.find('#delete5').hostNodes().simulate('click');
      wrapper.update();
      wrapper.find('#permanentDelete').hostNodes().simulate('click');
      expect(onConfirmDelete).toHaveBeenCalled();
    });
  });

  describe('appropriate prop functions', () => {
    it ('should call onEdit prop when editing', () => {
      let onEdit = jest.fn();
      let onGameSelected = jest.fn();
      let wrapper = mount(<GamesTable editable data={games} onEdit={onEdit} onGameSelected={onGameSelected}/>);
      wrapper.find('#edit5').hostNodes().simulate('click');
      wrapper.update();
      expect(onEdit).toHaveBeenCalled();
    });
  });
});
