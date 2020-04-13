import React from 'react';
import { List } from 'immutable';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import configureMockStore from 'redux-mock-store';
import ToDoList from '../ToDoList';
import toDoEntry from '../../store/__test_utils/dataEntryMock';

import App from '../App';

const mockStore = configureMockStore();

describe('<App />', () => {
  let mounted;
  let store = mockStore({
    toDoEntries: List([toDoEntry]),
    recordState: List([List([toDoEntry])]),
    appState: '',
  });

  beforeEach(() => {
    store = mockStore({
      toDoEntries: List([toDoEntry]),
      recordState: List([List([toDoEntry])]),
      appState: '',
    });
    mounted = mount(<Provider store={store}><App /></Provider>);
  });
  const wrapper = shallow(<App store={store} />);


  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const toDoEntries = [toDoEntry];
    const expexted = {
      toDoEntries,
      record: [toDoEntries],
      appState: '',
    };
    expect(wrapper.props().children.props.toDoEntries).toEqual(expexted.toDoEntries);
    expect(wrapper.props().children.props.record).toEqual(expexted.record);
    expect(wrapper.props().children.props.appState).toEqual(expexted.appState);
  });

  it('should map props to the state componet', () => {
    expect(mounted.find(ToDoList)).toHaveLength(1);
  });

  it('should dispatch create entry', () => {
    mounted.find('form').simulate('submit');
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('CREATE_TODO_ENTRY');
  });

  it('should dispatch delete entry', () => {
    mounted.find('#btn-remove').simulate('click');
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('DELETE_TODO_ENTRY');
  });

  it('should dispatch update entry', () => {
    mounted.find('#update').simulate('click');
    mounted.find('#form-update').simulate('submit');
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('UPDATE_TODO_ENTRY');
  });
});

describe('<App /> Record actions', () => {
  it('should disptch recording', () => {
    const store = mockStore({
      toDoEntries: List([toDoEntry]),
      recordState: List([List([toDoEntry])]),
      appState: '',
    });
    const mounted = mount(<Provider store={store}><App /></Provider>);
    mounted.find('#btn-Record').simulate('click');
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('RECORDING');
  });
  it('on Play Recording button click should stop if recording, clear TODOs and dispatch play', () => {
    const store = mockStore({
      toDoEntries: List([toDoEntry]),
      recordState: List([List([toDoEntry])]),
      appState: '',
    });
    const mounted = mount(<Provider store={store}><App /></Provider>);
    mounted.find('#btn-PlayRecording').simulate('click');
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('[{"type":"IDLE"},{"type":"CLEAR_ENTRIES"},{"type":"PLAYING"}]');
  });
  it('on Play Recording button click should stop if recording, clear TODOs and dispatch play', () => {
    const store = mockStore({
      toDoEntries: List([toDoEntry]),
      recordState: List([List([toDoEntry])]),
      appState: '',
    });
    const mounted = mount(<Provider store={store}><App /></Provider>);
    mounted.find('#btn-PlayRecording').simulate('click');
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('[{"type":"IDLE"},{"type":"CLEAR_ENTRIES"},{"type":"PLAYING"}]');
  });
  it('should claer recording', () => {
    const store = mockStore({
      toDoEntries: List([toDoEntry]),
      recordState: List([List([toDoEntry])]),
      appState: 'IDLE',
    });
    const mounted = mount(<Provider store={store}><App /></Provider>);
    mounted.find('#btn-ClearRecording').simulate('click');
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('CLEAR_RECORD');
  });
});

describe('<App /> Playing record', () => {
  it('should start play record in delay and stop recording', () => {
    jest.useFakeTimers();
    const store = mockStore({
      toDoEntries: List([toDoEntry]),
      recordState: List([List([toDoEntry])]),
      appState: 'PLAYING',
    });
    mount(<Provider store={store}><App /></Provider>);
    const actions = store.getActions();
    expect(JSON.stringify(actions)).toContain('IDLE');
  });
});
