import React from 'react';
import { MeetingOrganizationDetailsListType } from '../../lib/api';

interface IProps {
  blockName: string,
  organizations: MeetingOrganizationDetailsListType
}

const OrganizationsList: React.FC<IProps> = (props: IProps) => {
  if (!props.organizations.length) return null;
  return (<div className='pt-2'>
    <h3 className='text-primary font-size-12px px-0 sm:pl-8 sm:pr-12'>{props.blockName}</h3>
    {props.organizations.map((org, key) => {
      return (
        <div className='pb-5 px-0 sm:pl-8 sm:pr-12' key={key}>
          <p className='font-medium font-size-18px pb-1'>{org.name}</p>
          {!!org.attendees && org.attendees.map((att, key) =>
            <p className='font-size-14px' key={key}>
              {`${att.firstName} ${att.lastName}`}{(att.firstName || att.lastName) && att.title && `, `}{att.title}
            </p>
          )}
        </div>
      );
    })}
  </div>);
};

export default OrganizationsList;
