# OE-Connect-Passport-FE
Repository for Passport and MeetLinks projects

This project was bootstrapped with [react-scripts](https://www.npmjs.com/package/react-scripts).
#### What's included and pre-configured:
- `React` - using the latest version
- `Sass` - for CSS styling
- `React-Router` - includes `"/"` home and `"/about"` routes (for non-existing routes - redirects to "/")
- `TypeScript` - configuration is extendable via `tsconfig.json`
- `Webpack and Babel` - uses HMR, gzip for productions builds, includes hashes for built files
- `ESLint` - uses common configurations for TypeScript and React. To extend or change current rule-sets - use `eslintrc.js` 
- `Jest` - JavaScript Testing Framework 
- `Enzyme` - JavaScript Testing utility for React Components. 
- `environment variables` - for the local development create the file `.env` in the project root. Please refer to the `example.env` for the full list of supported variables.


### To run Passport Development version locally use next configuration for .env:
`HTTPS=true` <br>
`REACT_APP_PROFILE=passport`<br>
`REACT_APP_FE_ENV=development`<br>
`REACT_APP_APP_TITLE="OE Passport from OpenExchange"`<br>
`REACT_APP_API_ROOT=https://passport-api.dev-open-exchange.net`<br>
`REACT_APP_COGNITO_URL=https://passport-api.dev-open-exchange.net/auth`<br>
`REACT_APP_CLIENT_ID=***`<br>
`REACT_APP_AWS_REGION=***`<br>
`REACT_APP_USER_POOL_ID=***`<br>

##### for values used for `REACT_APP_CLIENT_ID`, `REACT_APP_AWS_REGION`, `REACT_APP_USER_POOL_ID` sign in into your AWS DEV account or visit [Confluence Page](https://kvprodman.atlassian.net/l/c/gHcCD79o) 

### To run MeetLinks Development version locally use next configuration for .env:
`HTTPS=true` <br>
`REACT_APP_PROFILE=meet`<br>
`REACT_APP_FE_ENV=development`<br>
`REACT_APP_API_ROOT=https://passport-api.dev-open-exchange.net`<br>


## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Unit Testing
Launches the test runner [Jest](https://jestjs.io/)<br />
To follow Jest recommendations UnitTest files should be prefixed as `*.spec.ts or *.spec.tsx`
and placed into `__tests__` directory.
#### `npm run test`
Run tests in the interactive watch mode
#### `npm run test:ci`
Run tests in CI environment
#### `npm run test:coverage`
Run tests and report test coverage

### `npm run lint`
Launches the linter [ESLint](https://www.npmjs.com/package/eslint)

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Learn More

You can learn more about the `react-scripts` package in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
