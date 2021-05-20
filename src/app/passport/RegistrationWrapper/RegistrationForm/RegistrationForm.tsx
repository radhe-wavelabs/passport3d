import React, { FormEvent, useState, useEffect } from 'react';
import Input from '../../../../components/input';
import Form from '../../../../components/_base/Form';
import Button from '../../../../components/button';
import useFormField from '../../../../hooks/use-form-field';
import { EMAIL_REGEXP, SPACE_TRIMMER, SHORT_PLAIN_TEXT_LENGTH, REQUIRED } from '../../../../lib/constants';
import { registerAttendee } from '../../../../lib/api/public';
import ErrorBlock from '../../../../components/_base/ErrorBlock';

type Props = {
  toggleRegistrationForm: () => void;
  showSubmitMessage: (v: boolean) => void;
  eventId: number;
};
const emailValidators = [EMAIL_REGEXP, SHORT_PLAIN_TEXT_LENGTH];
const textValidators = [SHORT_PLAIN_TEXT_LENGTH];
const requiredTextValidators = [REQUIRED, SHORT_PLAIN_TEXT_LENGTH];
const formatters = [SPACE_TRIMMER];

const RegistrationForm: React.FC<Props> = (props: Props): JSX.Element => {
  const [isValid, setValid] = useState<boolean>(false);
  const [theArray, setTheArray] = useState<string[]>([]);
  const emailField = useFormField('', emailValidators, formatters);
  const firstNameField = useFormField('', requiredTextValidators, formatters);
  const lastNameField = useFormField('', requiredTextValidators, formatters);
  const organizationField = useFormField('', requiredTextValidators, formatters);
  const phoneField = useFormField('', textValidators, formatters);
  const salutationField = useFormField('', textValidators, formatters);
  const titleField = useFormField('', textValidators, formatters);

  useEffect(() => {
    setValid([emailField.isValid, firstNameField.isValid, lastNameField.isValid, organizationField.isValid, phoneField.isValid, salutationField.isValid, titleField.isValid].every(Boolean));
  }, [emailField.isValid, firstNameField.isValid, lastNameField.isValid, organizationField.isValid, phoneField.isValid, salutationField.isValid, titleField.isValid]);

  const registrationHandle = (e: FormEvent): void => {
    e.preventDefault();
    const eventId = props.eventId.toString();
    const params = {
      email: emailField.value,
      firstName: firstNameField.value,
      lastName: lastNameField.value,
      organizationName: organizationField.value,
      phone: phoneField.value,
      salutation: salutationField.value,
      title: titleField.value
    };
    registerAttendee(eventId, params);
    props.showSubmitMessage(true);
    props.toggleRegistrationForm();
  };

  const className = 'editable-sign-in';
  const classNameRegistrationTitle = `${className}--title`;
  const classNameRegistrationSubmitButton = `${className}--submit-button`;
  const MAX_LENGTH_ERROR_MESSAGE = 'This field allow 255 characters max.';
  const EMAIL_ERROR_MESSAGE = 'Enter a valid email address.';
  const REQUIRED = 'This field is required.';

  const addEntryClick = (field: string) => {
    setTheArray((theArray: string[]) => [...theArray, field]);
  };

  const include = (field: string) => {
    const notExist = -1;
    return (theArray.indexOf(field) !== notExist);
  };

  return (
    <Form className='mt-4' onSubmit={registrationHandle} name='RegistrationForm'>
      <div className={`${classNameRegistrationTitle} text-4-25xl leading-10 h-12`}>Registration</div>
      <div className="mt-29px">
        <Input.Text
          id='firstName'
          name='firstName'
          label='First Name'
          error={include('firstNameField') && (!firstNameField.isValid || !firstNameField.value)}
          onBlur={() => addEntryClick('firstNameField')}
          {...firstNameField}
        />
        <div className="negative-margin">
          {include('firstNameField') && !firstNameField.value ?
            <ErrorBlock errorMessage={REQUIRED}/> :
            include('firstNameField') && !firstNameField.isValid &&
              <ErrorBlock errorMessage={MAX_LENGTH_ERROR_MESSAGE}/>}
        </div>
      </div>
      <div className="mt-29px">
        <Input.Text
          id='lastName'
          name='lastName'
          label='Last Name'
          error={include('lastNameField') && (!lastNameField.isValid || !lastNameField.value)}
          onBlur={() => addEntryClick('lastNameField')}
          {...lastNameField}
        />
        <div className="negative-margin">
          {include('lastNameField') && !lastNameField.value ?
            <ErrorBlock errorMessage={REQUIRED}/> :
            include('lastNameField') && !lastNameField.isValid && <ErrorBlock errorMessage={MAX_LENGTH_ERROR_MESSAGE}/>
          }
        </div>
      </div>
      <div className="mt-29px">
        <Input.Email
          id='email'
          name='email'
          placeholder='name@email.com'
          label='Email Address'
          error={include('emailField') && (!emailField.isValid || !emailField.value)}
          onBlur={() => addEntryClick('emailField')}
          {...emailField}
        />
        <div className="negative-margin">
          {include('emailField') && !emailField.value ?
            <ErrorBlock errorMessage={REQUIRED}/> :
            include('emailField') && !emailField.isValid && <ErrorBlock errorMessage={EMAIL_ERROR_MESSAGE}/>
          }
        </div>
      </div>
      <div className="mt-29px">
        <Input.Text
          id='organizationName'
          name='organizationName'
          label='Organization Name'
          error={include('organizationField') && (!organizationField.isValid || !organizationField.value)}
          onBlur={() => addEntryClick('organizationField')}
          {...organizationField}
        />
        <div className="negative-margin">
          {include('organizationField') && !organizationField.value ?
            <ErrorBlock errorMessage={REQUIRED}/> :
            include('organizationField') && !organizationField.isValid &&
              <ErrorBlock errorMessage={MAX_LENGTH_ERROR_MESSAGE}/>
          }
        </div>
      </div>
      <div className="mt-29px">
        <Input.Text
          id='salutation'
          name='salutation'
          label='Salutation'
          span='(optional)'
          error={include('salutationField') && !salutationField.isValid}
          onBlur={() => addEntryClick('salutationField')}
          {...salutationField}
        />
        <div className="negative-margin">
          {include('salutationField') && !salutationField.isValid &&
            <ErrorBlock errorMessage={MAX_LENGTH_ERROR_MESSAGE}/>}
        </div>
      </div>
      <div className="mt-29px">
        <Input.Text
          id='phone'
          name='phone'
          label='Phone'
          span='(optional)'
          error={include('phoneField') && !phoneField.isValid}
          onBlur={() => addEntryClick('phoneField')}
          {...phoneField}
        />
        <div className="negative-margin">
          {include('phoneField') && !phoneField.isValid && <ErrorBlock errorMessage={MAX_LENGTH_ERROR_MESSAGE}/>}
        </div>
      </div>
      <div className="mt-29px">
        <Input.Text
          id='title'
          name='title'
          label='Title'
          span='(optional)'
          error={include('titleField') && !titleField.isValid}
          onBlur={() => addEntryClick('titleField')}
          {...titleField}
        />
        <div className="negative-margin">
          {include('titleField') && !titleField.isValid && <ErrorBlock errorMessage={MAX_LENGTH_ERROR_MESSAGE}/>}
        </div>
      </div>
      <div className={`${classNameRegistrationSubmitButton} flex justify-end mt-8 mb-10 md:mt-12`}>
        <Button.Submit
          name='registration'
          label="Register"
          size={'big'}
          disabled={!isValid}
          className='min-w-full px-5 py-3 rounded bg-primary text-white'
        />
      </div>
    </Form>
  );
};

export default RegistrationForm;

