import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    iosClientId: '842238403079-qo2jads6djdes6025vdu4d890biqa0ka.apps.googleusercontent.com',
    webClientId: '842238403079-pl14imhsr0dlhvu77kunpqocj691kns4.apps.googleusercontent.com',
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    return response.data?.idToken || response.idToken;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error('Google Sign-Out Error:', error);
  }
};