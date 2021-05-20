import React, { FormEvent } from "react";
import Input from "../../../../components/input";
import Form from "../../../../components/_base/Form";
import Button from "../../../../components/button";
import useFormField from "../../../../hooks/use-form-field";
import ErrorBlock from "../../../../components/_base/ErrorBlock";
import {
  IAuthContext,
  useAuth,
} from "../../../../lib/context-providers/auth-context";
import { useCustomSettings } from "../../../../hooks/use-custom-settings";
import {
  EMAIL_REGEXP,
  MIN6CHAR,
  REQUIRED,
  SPACE_TRIMMER,
} from "../../../../lib/constants";

type Props = {
  signIn(email: string, code: string): Promise<void>;
  errorMsg?: string;
  hideSubmitMessage: () => void;
};

const emailValidators = [REQUIRED, EMAIL_REGEXP];
const accessCodeValidators = [REQUIRED, MIN6CHAR];
const formatters = [SPACE_TRIMMER];

const LoginForm: React.FC<Props> = (props: Props): JSX.Element => {
  const { loginErrorMessage, loginInstructions } = useCustomSettings();
  const emailField = useFormField("", emailValidators, formatters);
  const accessCodeFiled = useFormField("", accessCodeValidators, formatters);
  const { authError, resetAuthError } = useAuth() as IAuthContext;
  const dismissErrors = () => resetAuthError();
  const isValid = [emailField.isValid, accessCodeFiled.isValid].every(Boolean);

  const signInHandle = (e: FormEvent) => {
    e.preventDefault();

    props.hideSubmitMessage();
    return props.signIn(emailField.value, accessCodeFiled.value);
  };
  const className = "editable-sign-in";
  const classNameSignInTitle = `${className}--title`;
  const classNameSignInSubmitButton = `${className}--submit-button`;

  return (
    <Form className="mt-4" onSubmit={signInHandle} name="loginForm">
      <div
        className={`${classNameSignInTitle} text-4xl text-white leading-10 h-10 uppercase font-bold `}
      >
        Admit Card
      </div>
      <p className={`uppercase text-2xl text-white font-bold mt-20px`}>Login</p>
      {/* { loginInstructions && <div className="mt-29px break-words" dangerouslySetInnerHTML={{ __html: loginInstructions || '' }}/> } */}
      <div className="mt-20px">
        <Input.Email
          id="email"
          name="email"
          autoFocus
          placeholder="name@email.com"
          label="Email Address"
          error={!!authError}
          onFocus={dismissErrors}
          {...emailField}
        />
      </div>
      <div className="mt-20px">
        <Input.Password
          id="accessCode"
          name="accessCode"
          label="Password"
          error={!!authError}
          onFocus={dismissErrors}
          {...accessCodeFiled}
        />
      </div>
      <div className="mt-6 negative-margin">
        {authError && <ErrorBlock errorMessage={loginErrorMessage} />}
      </div>
      <div
        className={`${classNameSignInSubmitButton} flex justify-end mt-4 mb-4  btn-container`}
      >
        <p className={`text-forget`} >Forgot Password?</p>
        <Button.Submit
          name="signIn"
          label="Login"
          size={"big"}
          disabled={!isValid || !!authError}
          className=" px-5 py-3 rounded bg-primary text-white"
        />
      </div>
    </Form>
  );
};
export default LoginForm;
