import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51T4gMl1qrti3jnySLjakGGGrgmTM0CvHGebaEa8yU07eFrKv9sUrHYxNFT9SyxMKmtY7yfqwDYnqMA5JfP3c9Ieg00zAAHWUq8">
      <AppNavigator />
    </StripeProvider>
  );
};

export default App;