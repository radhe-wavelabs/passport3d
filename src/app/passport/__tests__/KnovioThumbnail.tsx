import React from 'react';
import { mount } from 'enzyme';
import Modal from 'react-modal';
import KnovioThumbnail from '../WelcomeWrapper/KnovioThumbnail';

const mockData = '111222333';
const expectCount = 1;

describe('KnovioThumbnail', () => {
  describe('KnovioThumbnail initializing', () => {
    it('should render KnovioThumbnail', () => {
      const wrapper = mount(<KnovioThumbnail welcomeKnovioEmbedId={mockData} />);
      expect(wrapper.find(KnovioThumbnail)).toHaveLength(expectCount);
      expect(wrapper.find(Modal)).toHaveLength(expectCount);
    });
  });
});
