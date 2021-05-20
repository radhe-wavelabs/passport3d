import React, { useState } from 'react';
import { EventPublicDetailsResponseType } from '../../../lib/api';
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import EventPublicInfo from "../LoginWrapper/EventPublicInfo/EventPublicInfo";

type Props = {
  data: EventPublicDetailsResponseType
}

const RegistrationWrapper: React.FC<Props> = (props: Props): JSX.Element => {
  const [showRegistrationForm, setRegistrationForm] = useState<boolean>(true);
  const [showSubmitMessage, setShowSubmitMessage] = useState<boolean>(false);
  const submitMessage = `Thank you for registering.  Please check your email for details of how to attend the event.`;
  return (
    <div className='flex justify-between flex-col md:flex-row'>
      <EventPublicInfo data={props.data}/>
      <div
        className='shadow-gray bg-white w-342px mt-6 md:mt-0 login-wrapper p-6 bg-opacity-100 bg-opacity-90 min-w-full md:min-w-0'
      >
        {showSubmitMessage && <><span>{submitMessage}</span>
          <hr className='mt-4 mb-4'/>
        </>}
        {showRegistrationForm &&
          <RegistrationForm
            eventId={props.data.eventId}
            showSubmitMessage={setShowSubmitMessage}
            toggleRegistrationForm={() => setRegistrationForm(!showRegistrationForm)}
          />
        }
      </div>
    </div>
  );
};

export default RegistrationWrapper;
