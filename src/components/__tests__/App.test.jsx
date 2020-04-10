import React from 'react';
import { List } from 'immutable';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import configureMockStore from 'redux-mock-store';
import ToDoList from '../ToDoList';
import toDoEntry from '../../store/__test_utils/dataEntryMock';

import App from '../App';

describe('<App />', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    toDoEntries: List([toDoEntry]),
    recordState: List([List([toDoEntry])]),
    appState: '',
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
    const mounted = mount(<Provider store={store}><App /></Provider>);
    expect(mounted.find(ToDoList)).toHaveLength(1);
  });
  it('should add to do entry', () => {

  })
});
