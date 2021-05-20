import React, { Fragment, useState } from "react";
import { EventPublicDetailsResponseType } from "../../../lib/api";
import LoginForm from "./LoginForm/LoginForm";
import EventPublicInfo from "./EventPublicInfo/EventPublicInfo";
import { AccessCodeReminder } from "./AccessCodeReminder/AccessCodeReminder";
import RegisterBlock from "./RegisterBlock/RegisterBlock";
import {
  IEventCustomSettings,
  useCustomSettings,
} from "../../../hooks/use-custom-settings";
import Icon from "../../../components/_base/Icon";
import DateRangeWelcome from "./EventPublicInfo/DateRangeWelcome";

import AdminCard from "../../../Assets/Admit-Card.png";
import OElogo from "../../../Assets/Powered-by-logo.png";
import clientLogo from "../../../Assets/provenance-trust-vertical.png";

type Props = {
  signIn(email: string, code: string): Promise<void>;
  data: EventPublicDetailsResponseType;
};
const LoginWrapper: React.FC<Props> = (props: Props): JSX.Element => {
  const [showAccessCodeReminder, setShowAccessCodeReminder] =
    useState<boolean>(true);
  const [showSubmitMessage, setShowSubmitMessage] = useState<boolean>(false);
  const submitMessage = `Thank you. If there is an Access Code
          associated with your email address, it will be sent to you by email. Please check your inbox.`;
  const classNameSignIn = "editable-sign-in";
  const classNameSignInWrapper = `${classNameSignIn}--wrapper`;
  const { registrationEnabled } = useCustomSettings() as IEventCustomSettings;
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const handleLogin = () => {
    setShowLogin(false);
    console.log(showLogin);
  };

  return (
    <Fragment>
      {showLogin ? (
        <div className="Bg-container">
          <div className="banner">
            <div className="img-wapper ">
              <img
                src={clientLogo}
                alt={props.data.logoTitle}
                title={props.data.logoTitle}
                className={`img-banner`}
              />
            </div>
            <p style={{ fontSize: "15px" }}>{props.data.name}</p>
            <hr />
            <DateRangeWelcome
              startTime={props.data.startTime}
              endTime={props.data.endTime}
              timeZone={props.data.timeZone}
            />
            <div className="pulse" onClick={handleLogin}></div>
            <div className={`fill-current text-white arrow-down`}>
              <Icon.DownArrow width="30px" height="30px" />
            </div>
          </div>
          <div className="side-banner">
            <img
              src={props.data.logoUrl}
              alt={props.data.logoTitle}
              title={props.data.logoTitle}
              style={{
                padding: "10px",
              }}
            />
            <p className="side-banner-text">{props.data.name}</p>
          </div>
        </div>
      ) : (
        <div className={`${classNameSignIn}  login-bg-img`}>
          <div className="login-bg-container">
            <EventPublicInfo data={props.data} />
            <div className="form-bg-img">
              <img src={AdminCard} style={{ position: "relative" }} />
              <div className="form-container">
                {showSubmitMessage && (
                  <>
                    <span>{submitMessage}</span>
                    <hr className="mt-4 mb-4" />
                  </>
                )}
                {showAccessCodeReminder && (
                  <LoginForm
                    signIn={props.signIn}
                    errorMsg={props.data.loginErrorMessage}
                    hideSubmitMessage={() => setShowSubmitMessage(false)}
                  />
                )}
                <AccessCodeReminder
                  eventId={props.data.eventId}
                  state={showAccessCodeReminder}
                  showSubmitMessage={setShowSubmitMessage}
                  showAccessCodeReminder={() =>
                    setShowAccessCodeReminder(!showAccessCodeReminder)
                  }
                />
              </div>
              {/* {registrationEnabled && showAccessCodeReminder && (
                <RegisterBlock />
              )} */}
              <div className={`login-form-logos`}>
                <img src={clientLogo} className={`client-img`} />
                <img src={OElogo} className={`logo`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LoginWrapper;
