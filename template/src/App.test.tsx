import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import { mount } from 'enzyme';
import App from './App';

it('renders without crashing.', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
