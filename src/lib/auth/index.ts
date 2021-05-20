import { Auth } from 'aws-amplify';

export async function getCurrentSessionToken(): Promise<string | void> {
  try {
    return await (await Auth.currentSession())?.getIdToken()?.getJwtToken();
  } catch (e) {
    throw e;
  }
}

export async function validateCurrentAuthenticatedUser(): Promise<void> {
  try {
    return await Auth.currentAuthenticatedUser({ bypassCache: true });
  } catch (e) {
    throw e;
  }
}

export async function authenticate(username: string, accessCode: string): Promise<void> {
  try {
    return await Auth.signIn(username, accessCode);
  } catch (e) {
    throw e;
  }
}

export async function invalidate(): Promise<void> {
  try {
    return await Auth.signOut();
  } catch (e) {
    throw e;
  }
}
