import React from 'react';
import { mount } from 'enzyme';
import OrganizationsList from '../OrganizationsList';

const orgMock = [
  {
    name: 'String',
    organizationId: 1,
    attendees: [
      {
        attendeeId: 1,
        firstName: 'string',
        lastName: 'string',
        title: 'string'
      }
    ]
  },
  {
    name: 'String 2',
    organizationId: 2,
    attendees: [
      {
        attendeeId: 1,
        firstName: 'string',
        lastName: 'string',
        title: 'string'
      },
      {
        attendeeId: 2,
        firstName: 'string',
        lastName: 'string',
        title: 'string'
      }
    ]
  }
];
const blockNameMock = 'test';

describe('OrganizationsList', () => {
  it('should render correct props', () => {
    const wrapper = mount(<OrganizationsList blockName={blockNameMock} organizations={orgMock}/>);
    expect(wrapper.prop('organizations')).toMatchObject(orgMock);
    expect(wrapper.prop('blockName')).toEqual(blockNameMock);
  });
});
