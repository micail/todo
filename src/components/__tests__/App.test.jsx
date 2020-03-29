import React from 'react';
import { shallow } from 'enzyme';

import configureMockStore from 'redux-mock-store';

import toDoEntry from '../../store/__test_utils/dataEntryMock';

import App from '../App';

describe('<App />', () => {
  const mockStore = configureMockStore();
  const store = mockStore({ toDoEntries: [toDoEntry] });
  const wrapper = shallow(<App store={store} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should map state to props', () => {
    expect(wrapper.props().children.props.toDoEntries).toEqual([toDoEntry]);
  });
});
