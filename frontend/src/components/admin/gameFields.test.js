import React from 'react';
import '../../setupTests';
import GameFields from './gameFields';
import {shallow} from 'enzyme';
import {User} from '../../models/user';
import {Button, Switch, TextField} from '@mui/material';
import { act } from 'react-dom/test-utils';

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
  jest.restoreAllMocks();
});

describe('<GameFields />', () => {
  let comp = null;

  describe('creating a game', () => {
    beforeEach(() => {
      comp = shallow(<GameFields />);
    });

    it('Should have correct page title', () => {
      expect(comp.text()).toContain('Create Game');
    });

    it('should have an empty target title field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Title');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual('');
    });

    it('should have an empty code field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Code');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual('');
    });

    it('should have an empty questions field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Questions JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual('[]');
    });

    it('should have an empty options field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Options JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual('[]');
    });

    it('should have a cancel button', () => {
      const found = false;
      const input = comp
          .find(Button)
          .filterWhere((i) => i.prop('children') == 'Cancel');
      expect(input.getElement()).not.toBeNull();
    });

    it('should have a submit button', () => {
      const found = false;
      const input = comp
          .find(Button)
          .filterWhere((i) => i.prop('children') == 'Submit');
      expect(input.getElement()).not.toBeNull();
    });
  });

  describe('edting a game', () => {
    const game = {
      title: 'My Title',
      active: false,
      questions: [{id: 1}],
      options: [{id: 2}],
      code: 123412,
    };

    beforeEach(() => {
      comp = shallow(<GameFields game={game} />);
    });

    it('Should have correct page title', () => {
      expect(comp.text()).toContain('Edit Game');
      expect(comp.text()).toContain(game.title);
    });

    it('should have an empty target title field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Title');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual(game.title);
    });

    it('should have an empty code field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Code');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual(game.code);
    });

    it('should have an empty questions field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Questions JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual(
          JSON.stringify(game.questions),
      );
    });

    it('should have an empty options field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Options JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual(JSON.stringify(game.options));
    });

    it('should have a cancel button', () => {
      const found = false;
      const input = comp
          .find(Button)
          .filterWhere((i) => i.prop('children') == 'Cancel');
      expect(input.getElement()).not.toBeNull();
    });

    it('should have a submit button', () => {
      const found = false;
      const input = comp
          .find(Button)
          .filterWhere((i) => i.prop('children') == 'Submit');
      expect(input.getElement()).not.toBeNull();
    });

    it('should update on title change', () => {
      const findInput = () => {
        return comp
            .find(TextField)
            .filterWhere((i) => i.props().label == 'Title');
      }

      let input = findInput();
      const newValue = 'newTitle';
      act(() => {
        input.simulate('change', {target: {value: newValue}});
      });
      input = findInput()
      expect(input.props().value).toEqual(newValue);
    });

    it('should update on code change', () => {
      const findInput = () => {
        return comp
            .find(TextField)
            .filterWhere((i) => i.props().label == 'Code');
      }

      let input = findInput();
      const newValue = 'newCode';
      act(() => {
        input.simulate('change', {target: {value: newValue}});
      });
      input = findInput();
      expect(input.props().value).toEqual(newValue);
    });

    it('should update on options change', () => {
      const findInput = () => {
        return comp
            .find(TextField)
            .filterWhere((i) => i.props().label == 'Options JSON');
      }

      let input = findInput();
      const newValue = 'newOptions';
      act(() => {
        input.simulate('change', {target: {value: newValue}});
      });
      input = findInput();
      expect(input.props().value).toEqual(newValue);
    });

    it('should update on questions change', () => {
      const findInput = () => {
        return comp
            .find(TextField)
            .filterWhere((i) => i.props().label == 'Questions JSON');
      }

      let input = findInput();
      const newValue = 'newQuestions';
      act(() => {
        input.simulate('change', {target: {value: newValue}});
      });
      input = findInput();
      expect(input.props().value).toEqual(newValue);
    });

    it('should update on active change', () => {
      const findInput = () => {
        return comp
            .find(Switch)
            .filterWhere((i) => i.props().label == 'Active');
      }

      let input = findInput();
      const originalInput = input.props().checked;
      act(() => {
        input.simulate('change');
      });
      input = findInput();
      expect(input.props().checked).toEqual(!originalInput);
    });
  });

  it('should call ths props onSubmit when submitted', () => {
    const myFunc = jest.fn();
    comp = shallow(<GameFields onSubmit={myFunc} />);
    const input = comp
        .find(Button)
        .filterWhere((i) => i.prop('children') == 'Submit');
    expect(input.getElement()).not.toBeNull();
    input.simulate('click');
    expect(myFunc).toHaveBeenCalled();
  });

  it('should call ths props onCancel when submitted', () => {
    const myFunc = jest.fn();
    comp = shallow(<GameFields onCancel={myFunc} />);
    const input = comp
        .find(Button)
        .filterWhere((i) => i.prop('children') == 'Cancel');
    expect(input.getElement()).not.toBeNull();
    input.simulate('click');
    expect(myFunc).toHaveBeenCalled();
  });

  describe('importing a file', () => {
    let fileInput;
    let comp;
    let json;
    let parts;

    const getTitle = () => {
      return comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Title');
    }

    beforeEach(() => {
      comp = shallow(<GameFields />)
      fileInput = comp.find({'data-testid': 'file-upload'});
      json = {
        'title': 'Title',
        'active': true,
        'creator_id': 1,
        'code': 123123,
        'questions': [{
          'label': 'a',
          'value': 'question a',
          'passcode': '123456',
          'chance': false,
        }],
        'options': [{
          'value': 'option a',
          'source_label': 'a',
          'dest_label': 'a',
          'weight': 1,
        }],
      }
    });

    it('should work on valid files', async () => {
      const parts = [
        new Blob([JSON.stringify(json)], {type: 'application/json'}),
      ];
      
      const file = new File(parts, 'file.json', {
        lastModified: new Date(2022, 4, 10),
        type: "application/json",
      });

      act(() => {
        fileInput.simulate('change', {target: {files: [file]}})
      })

      const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
      await pauseFor(1000);
      expect(getTitle().props().value).toEqual(json.title);
    });

    it('should not work when missing title', async () => {
      delete json.title;
      const parts = [
        new Blob([JSON.stringify(json)], {type: 'application/json'}),
      ];
      
      const file = new File(parts, 'file.json', {
        lastModified: new Date(2022, 4, 10),
        type: "application/json",
      });

      act(() => {
        fileInput.simulate('change', {target: {files: [file]}})
      })

      const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
      await pauseFor(1000);
      expect(getTitle().props().value).toEqual('');
    });

    it('should not work when code title', async () => {
      delete json.code;
      const parts = [
        new Blob([JSON.stringify(json)], {type: 'application/json'}),
      ];
      
      const file = new File(parts, 'file.json', {
        lastModified: new Date(2022, 4, 10),
        type: "application/json",
      });

      act(() => {
        fileInput.simulate('change', {target: {files: [file]}})
      })

      const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
      await pauseFor(1000);
      expect(getTitle().props().value).toEqual('');
    });

    it('should not work when missing options', async () => {
      delete json.options;
      const parts = [
        new Blob([JSON.stringify(json)], {type: 'application/json'}),
      ];
      
      const file = new File(parts, 'file.json', {
        lastModified: new Date(2022, 4, 10),
        type: "application/json",
      });

      act(() => {
        fileInput.simulate('change', {target: {files: [file]}})
      })

      const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
      await pauseFor(1000);
      expect(getTitle().props().value).toEqual('');
    });

    

    it('should not work when missing questions', async () => {
      delete json.questions;
      const parts = [
        new Blob([JSON.stringify(json)], {type: 'application/json'}),
      ];
      
      const file = new File(parts, 'file.json', {
        lastModified: new Date(2022, 4, 10),
        type: "application/json",
      });

      act(() => {
        fileInput.simulate('change', {target: {files: [file]}})
      })

      const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
      await pauseFor(1000);
      expect(getTitle().props().value).toEqual('');
    });

    

    it('should not work with invalid file types', async () => {
      const parts = [
        'asdfasdf'
      ];
      
      const file = new File(parts, 'file.txt', {
        lastModified: new Date(2022, 4, 10),
        type: "text/plain",
      });

      act(() => {
        fileInput.simulate('change', {target: {files: [file]}})
      })

      const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
      await pauseFor(1000);
      expect(getTitle().props().value).toEqual('');
    });
  });
});
