import { isPassportProfile, getRuntimeConfig } from '../../app-config';

if (isPassportProfile()) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('aws-amplify').Auth.configure(getRuntimeConfig());
  } catch (e) {
    throw new Error(e);
  }
}

