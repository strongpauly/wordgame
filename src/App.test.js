import React from 'react';
import App from './App';
import {shallow, mount} from 'enzyme';

/* eslint-env jest */

describe('<App>', () => {
  it('renders without crashing', () => {
    mount(<div><App /></div>);
  });

  it('creates a new game id when restarted.', () => {
    const app = shallow(<App/>);
    expect(app).toMatchSnapshot();
    expect(app.find('Game[gameId=0]')).toHaveLength(1);
    app.instance().restart();
    expect(app.find('Game[gameId=0]')).toHaveLength(0);
    expect(app.find('Game[gameId=1]')).toHaveLength(1);
  });
});
