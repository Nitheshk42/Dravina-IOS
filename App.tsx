import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { configureGoogleSignIn } from './src/services/googleAuth';

const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return <AppNavigator />;
};

export default App;