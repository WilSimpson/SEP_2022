import { beforeEach } from "@jest/globals";
import { render, } from "enzyme";
import { unmountComponentAtNode } from "react-dom";
import { User } from "../../models/user.model";
import GamesTable from "./GamesTable";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

const user = new User('email@example.com', 'FirstName', 'LastName', 'ADMIN', 'token', 1);
const games = [
  {
    title: 'My Title',
    active: false,
    questions: [{ id: 1 }],
    options: [{ id: 2 }],
    code: 123412
  },
  {
    title: 'My Title 1',
    active: true,
    questions: [{ id: 10 }],
    options: [{ id: 29 }],
    code: 123413
  },
  {
    title: 'My Title 2',
    active: false,
    questions: [{ id: 18 }],
    options: [{ id: 27 }],
    code: 123415
  },
  {
    title: 'My Title 3',
    active: false,
    questions: [{ id: 16 }],
    options: [{ id: 25 }],
    code: 123416
  },
  {
    title: 'My Title 4',
    active: true,
    questions: [{ id: 14 }],
    options: [{ id: 23 }],
    code: 123419
  },
  {
    title: 'My Title 5',
    active: true,
    questions: [{ id: 11 }],
    options: [{ id: 22 }],
    code: 223412
  },
]

let container = null;

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
  container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(() => {
  localStorage.clear();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

function getGamesTable(game=[]) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={GamesTable} />
      </Routes>
    </BrowserRouter>
  );
}

describe("<GamesTable />", () => {
  let comp = null;

  it('test', () => {
    comp = render(getGamesTable())
  })
  // describe("given no games", () => {
  //   beforeEach(() => {
  //     comp = render(getGamesTable())
  //   })

  //   it('should be a games table', () => {
  //     console.log(shallow(getGamesTable()).debug())
  //     const input = comp.find(TableContainer)
  //     expect(input.length).toEqual(1);
  //   })

  //   // it('should show no games', () => {
  //   //   const rows = comp.find(TableRow).filterWhere((i) => i.prop('className') == 'game-row');
  //   //   expect(rows.length).toEqual(0)
  //   // })
  // })

  // describe("given 6 games", () => {
  //   beforeEach(() => {
  //     comp = render(getGamesTable(games))
  //   })

  //   it('should be a games table', () => {
  //     expect(comp);
  //   })

  //   it('should show 5 games on the first page', () => {
  //     const rows = comp.find(TableRow).filterWhere((i) => i.prop('className') == 'game-row');
  //     expect(rows.length).toEqual(5)
  //   })
  // })
});