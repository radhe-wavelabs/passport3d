import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { HTTP_STATUS } from "../../../config/api";
import { NOT_FOUND_PATH } from "../../../config/routes/paths";
import { useEventPrivateInfo } from "../../../hooks/api/protected/use-event-private-details";
import useDefaultRoutePage from "../../../hooks/use-default-route-page";
import EventDetails from "../../shared/EventDetails";
import WelcomeBlock from "./WelcomeBlock";
import {
  IAuthContext,
  useAuth,
} from "../../../lib/context-providers/auth-context";

import bgImage from "../../../Assets/dashboard-bg-img.jpg";
import logoutBgImg from "../../../Assets/Hanging_Navigation.png";
import LeftArrow from "../../../components/_base/Icon";
import Icon from "../../../components/_base/Icon";

const WelcomeWrapper: React.FC = (): JSX.Element | null => {
  const { data, isValidating, error } = useEventPrivateInfo();
  const landingPage = useDefaultRoutePage();
  let history = useHistory();
  const auth = useAuth() as IAuthContext;

  if (!isValidating && error?.status === HTTP_STATUS.NOT_FOUND) {
    return <Redirect to={NOT_FOUND_PATH} />;
  }

  if (!isValidating && data && !data.welcomeEnabled) {
    return <Redirect to={landingPage} />;
  }

  if (data)
    return (
      <>
        <div className="welcome-page-wapper">
          <img src={bgImage} className="home-bgImage" />
          <div className="event-info">
            <EventDetails details={data} />
          </div>
          <div className="logout-img">
            <img src={logoutBgImg} />
            <div className="fill-current text-white logout-wapper">
              <Icon.LeftArrow width="30px" height="30px" />
              <p onClick={() => auth.signOut()}>logout</p>
            </div>
          </div>
          <div className="schedule-wapper">
            <div className="label-text">
              <p>my schedule</p>
            </div>
            <div
              className="text-pulse"
              onClick={() => history.push("/agenda")}
            ></div>
          </div>
          <div className="case-wapper">
            <div className="label-text">
              <p>showcases</p>
            </div>
            <div className="text-pulse"></div>
          </div>
          <div className="general-wapper">
            <div className="text-pulse"></div>
            <div className="label-text">
              <p>general sessions</p>
            </div>
          </div>
          <div className="content-wapper">
            <div className="text-pulse"></div>
            <div className="label-text">
              <p>content library </p>
            </div>
          </div>
          <div className="help-wapper">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="text-pulse"></div>
            </div>
            <div className="label-text">
              <p>help desk </p>
            </div>
          </div>
          <div className="center-img">
            <img src={data.logoUrl} width="110px" />
          </div>
        </div>

        {/* <WelcomeBlock {...data}/>  */}
      </>
    );

  return null;
};

export default WelcomeWrapper;
