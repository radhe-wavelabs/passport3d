import React from "react";
import ApiErrorProvider from "../lib/context-providers/api-error-context";
import CustomSettingsProvider from "../lib/context-providers/custom-settings-context";
import EventSettingsProvider from "../lib/context-providers/event-settings-context";
import MediaQueryContextProvider from "../lib/context-providers/media-query-provider";
import AppRouter from "./Router";
import { RoutesConfig } from "../config/routes";

import { isPassportProfile } from "../app-config";
import AuthProvider from "../lib/context-providers/auth-context";
import ErrorModal from "./shared/ErrorModal";

type Props = {
  routes: RoutesConfig;
};

function App(props: Props): JSX.Element {
  return (
    <div className="App">
      <div className="h-screen w-full mx-auto overflow-auto" data-id="app">
        <AppRouter {...props} />
        <ApiErrorProvider>
          <ErrorModal />
        </ApiErrorProvider>
      </div>
    </div>
  );
}

export default (props: Props): JSX.Element => {
  if (isPassportProfile()) {
    return (
      <AuthProvider>
        <MediaQueryContextProvider>
          <CustomSettingsProvider>
            <EventSettingsProvider>
              <App {...props} />
            </EventSettingsProvider>
          </CustomSettingsProvider>
        </MediaQueryContextProvider>
      </AuthProvider>
    );
  }
  return <App {...props} />;
};
