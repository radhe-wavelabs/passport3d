import React, { FormEvent } from 'react';
import Form from '../../../../components/_base/Form';
import Input from '../../../../components/input';
import useFormField from '../../../../hooks/use-form-field';
import Button from '../../../../components/button';
import { EMAIL_REGEXP, REQUIRED, SPACE_TRIMMER } from '../../../../lib/constants';
import { requestAccessCode } from '../../../../lib/api/public';

interface IProps {
  state: boolean;
  showAccessCodeReminder: ()=> void;
  showSubmitMessage: (v: boolean)=> void;
  eventId: number;
}

export const AccessCodeReminder = (props: IProps): JSX.Element => {

  const emailValidators = [ REQUIRED, EMAIL_REGEXP ];
  const formatters = [ SPACE_TRIMMER ];

  const emailField = useFormField('', emailValidators, formatters);
  const isValid = [ emailField.isValid ].every(Boolean);

  const requestAccessCodeHandle = (e: FormEvent): void => {
    e.preventDefault();

    requestAccessCode(props.eventId.toString(), emailField.value);

    emailField.onChange();
    props.showSubmitMessage(true);
    props.showAccessCodeReminder();
  };
  const className = 'editable-sign-in';        
  const classNameSignInAccessCode = props.state ? `${className}--access-code` : `${className}--back-to-sign-in`;
  const classNameSignInSubmitButton = `${className}--access-submit-button`;

  return (
    <>
      <small
        className={`${classNameSignInAccessCode} font-bold text-primary cursor-pointer w-full`}
        onClick={props.showAccessCodeReminder}
      >
        {props.state ?
          <div
            className='flex justify-center text-white font-size-13px font-medium'
            onClick={()=> props.showSubmitMessage(false)}
          >
            Request Access Code
          </div> :
          <div>
            <span className="text-white">&#x25C0;</span>
            <span className='font-size-13px text-white font-medium'>&nbsp;Sign In</span>
          </div>
        }
      </small>

      {!props.state && <Form onSubmit={requestAccessCodeHandle} name='accessCodeForm'>
        <div className='text-xl leading-10 h-12 mt-4 text-white font-size-22px whitespace-no-wrap'>Request Access Code</div>
        <small className="text-white">Please enter your email address.</small>
        <div className='mt-8'>
          <Input.Email
            id='email'
            name='email'
            autoFocus
            placeholder='name@email.com'
            label='Email Address'
            { ...emailField }
          />
        </div>
        <div className={`${classNameSignInSubmitButton} flex justify-end md:mt-20 mt-4`}>
          <Button.Submit
            name='requestAccessCode'
            label='Submit'
            size='big'
            disabled={!isValid}
            className='min-w-full px-5 py-3 rounded bg-primary text-white'
          />
        </div>
      </Form>}
    </>
  );
};
