import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, render } from 'enzyme';

import Form from '../Form';
import toDoEntry from '../../store/__test_utils/dataEntryMock';

const mockStore = configureMockStore();

describe('<Form />', () => {
  const store = mockStore();
  const wrapper = mount(<Provider store={store}><Form /></Provider>);

  const name = 'The name of ToDo';
  const description = 'Description of ToDo';
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('initializes the empty `state`', () => {
    expect(wrapper.state).toBeInstanceOf(Function);
  });
  it('should handle name value', () => {
    wrapper.find('#name').at(0).simulate('change', { target: { value: name, id: 'name' }, persist: jest.fn() });
    const hook = { ...wrapper.find('#name').props() };
    const { value } = hook;
    expect(value).toEqual(name);
  });
  it('should handle description value', () => {
    wrapper.find('#description').at(0).simulate('change', { target: { value: description, id: 'description' }, persist: jest.fn() });
    const hook = { ...wrapper.find('#description').at(0).props() };
    const { value } = hook;
    expect(value).toEqual(description);
  });
});
