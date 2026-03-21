// ─── ENVIRONMENT CONFIG ───────────────────────────────────────
// Two environments: development (local) and production (deployed)

const ENV = {
  dev: {
    API_URL: 'http://localhost:8080/api',
    // For physical device testing, use your Mac's IP:
    // API_URL: 'http://192.168.x.x:8080/api',
    GOOGLE_CLIENT_ID: 'your-dev-google-client-id',
    STRIPE_KEY: 'your-dev-stripe-key',
  },
  prod: {
    API_URL: 'https://your-production-url.com/api',
    GOOGLE_CLIENT_ID: 'your-prod-google-client-id',
    STRIPE_KEY: 'your-prod-stripe-key',
  },
};

// __DEV__ is a built-in React Native flag
// true when running in development, false in production build
const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars;