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

  // it('clears completed when restarted.', () => {
  //   const app = mount(<App width={1} height={2}/>);
  //   //Not completed
  //   expect(app.find('.completed')).toHaveLength(0);
  //   //Click one cell - this should either explode or win the game as there are only two cells.
  //   app.find('Cell td').at(0).simulate('click');
  //   //Game should be completed
  //   expect(app.find('.completed')).toHaveLength(1);
  //   //Restart the game.
  //   app.instance().restart();
  //   //Game should be reset.
  //   expect(app.find('.completed')).toHaveLength(0);
  // });
});
