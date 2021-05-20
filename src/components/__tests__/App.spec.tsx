import React from 'react';
import App from '../../app/App';
import { shallow } from 'enzyme';

import Header from '../_base/Header';
import Footer from '../_base/Footer';

describe('App', () => {
  const appWrapper = shallow(<App routes={{}}/>);
  it('should render main App container including Header, MeetingDetails and Footer', () => {
    expect([appWrapper.find(Header), appWrapper.find(Footer)].every(Boolean)).toBeTruthy();
  });
});
