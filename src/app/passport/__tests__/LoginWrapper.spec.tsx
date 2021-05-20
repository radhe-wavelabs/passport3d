import React from 'react';
import { shallow } from 'enzyme';
import LoginWrapper from '../LoginWrapper/LoginWrapper';
import { AccessCodeReminder } from '../LoginWrapper/AccessCodeReminder/AccessCodeReminder';
import LoginForm from '../LoginWrapper/LoginForm/LoginForm';
import EventPublicInfo from '../LoginWrapper/EventPublicInfo/EventPublicInfo';

import { EventPublicDetailsResponseType } from '../../../lib/api';

const mockData: EventPublicDetailsResponseType = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test',
  logoUrl: 'logoUrl',
  logoTitle: 'logoTitle',
  footerLinks: [],
  customCss: ''
};

const AccessCodeReminderProps = {
  eventId: 1,
  state: false,
  showSubmitMessage: jest.fn,
  showAccessCodeReminder: jest.fn,
};

const LoginFormProps = {
  signIn: jest.fn,
  hideSubmitMessage: jest.fn,
};

const EventPublicInfoProps = {
  data: mockData,
};

jest.mock('../../../lib/context-providers/auth-context', () => ({
  useAuth:  ()=> { 
    return { authError: null, resetAuthError: jest.fn };
  }
}));

const expectCount = 1;
const className = 'editable-sign-in';

describe('LoginWrapper', () => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any = null;  
  let props = null;

  beforeEach(() => {
    wrapper = () => {
      props = {
        signIn: jest.fn(),
        data: mockData,
      };

      return shallow(<LoginWrapper {...props} />);
    };
  });

  it('should render', () => {
    expect(wrapper()).toHaveLength(expectCount);
  });

 
  describe('LoginWrapper classes for editting', () => {
    it('should should find classes from array', () => {
      const classes = [
        className,
        `${className}--wrapper`,
      ];
      classes.forEach(className => {
        expect(wrapper().find('.' + className)).toHaveLength(expectCount);
      });
    });
  });
});

describe('AccessCodeReminder', () => {
  describe('AccessCodeReminder classes for editting', () => {
    it('should should find classes from array', () => {
      const classes = [
        AccessCodeReminderProps.state ? `${className}--access-code` : `${className}--back-to-sign-in`,
        `${className}--access-submit-button`
      ];
      const wrapper = shallow(<AccessCodeReminder props={AccessCodeReminderProps} />);
      classes.forEach(className => {
        expect(wrapper.find('.' + className)).toHaveLength(expectCount);
      });
    });
  });
});

describe('LoginForm', () => {
  describe('LoginForm classes for editting', () => {
    it('should should find classes from array', () => {
      const classes = [
        `${className}--title`,
        `${className}--submit-button`
      ];
      const wrapper = shallow(<LoginForm props={LoginFormProps} />);
      classes.forEach(className => {
        expect(wrapper.find('.' + className)).toHaveLength(expectCount);
      });
    });
  });
});


describe('EventPublicInfo', () => {
  describe('EventPublicInfo classes for editting', () => {
    it('should should find classes from array', () => {
      const classes = [
        `${className}--left-content`,
        `${className}--left-content-title`,
        `${className}--left-content-date`,
        `${className}--left-content-description`
      ];
      const wrapper = shallow(<EventPublicInfo data={EventPublicInfoProps} />);
      classes.forEach(className => {
        expect(wrapper.find('.' + className)).toHaveLength(expectCount);
      });
    });
  });
});
