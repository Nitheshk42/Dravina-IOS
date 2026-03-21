import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── API INSTANCE ─────────────────────────────────────────────
// Change this URL to your backend server
const API = axios.create({
  baseURL: 'http://localhost:8080/api', // Dev: use your machine's IP for physical device
  withCredentials: true,
  timeout: 15000, // 15 second timeout for mobile networks
});

// ─── ACCESS TOKEN IN ASYNC STORAGE ────────────────────────────
// AsyncStorage is the mobile equivalent of sessionStorage
// It's async (returns promises), unlike sessionStorage which is sync

export const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const clearAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

// ─── USER DATA IN ASYNC STORAGE ──────────────────────────────
// Replaces localStorage.setItem('user', ...) from web app

export const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing user:', error);
  }
};

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────
// Automatically attach access token to every request
// Same logic as your web app, but async because AsyncStorage is async
API.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────
// If access token expired (401) → auto refresh → retry request
// Same logic as your web app
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint — cookie sent automatically
        const response = await axios.post(
          `${API.defaults.baseURL}/auth/refresh`,
          {},
          {withCredentials: true},
        );

        const newAccessToken = response.data.accessToken;
        await setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed → clear everything
        processQueue(refreshError, null);
        await clearAccessToken();
        await clearUser();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// ─── AUTH ─────────────────────────────────────────────────────
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = () => API.post('/auth/logout');
export const googleAuth = (data) => API.post('/auth/google', data);

// ─── BALANCE ──────────────────────────────────────────────────
export const getBalance = () => API.get('/transfer/balance');

// ─── TRANSFER ─────────────────────────────────────────────────
export const sendMoney = (data) => API.post('/transfer/send', data);
export const getLimits = () => API.get('/transfer/limits');
export const getHistory = () => API.get('/transfer/history');

// ─── PAYMENT ──────────────────────────────────────────────────
export const createPaymentIntent = (data) =>
  API.post('/payment/create-intent', data);
export const confirmPayment = (data) => API.post('/payment/confirm', data);

// ─── RECIPIENTS ───────────────────────────────────────────────
export const getRecipients = () => API.get('/recipient');
export const addRecipient = (data) => API.post('/recipient', data);
export const deleteRecipient = (id) => API.delete(`/recipient/${id}`);
export const updateRecipient = (id, data) => API.put(`/recipient/${id}`, data);

// ─── ACCOUNTS ───────────────────────────────────────────────
export const getAccounts = () => API.get('/accounts');
export const addAccount = (data) => API.post('/accounts', data);
export const deleteAccount = (id) => API.delete(`/accounts/${id}`);

// ─── UTILS ────────────────────────────────────────────────────
export const getRates = () => API.get('/utils/rates');
export const getUserLocation = () => API.get('/utils/location');

// ─── REFERRAL ─────────────────────────────────────────────────
export const getReferralStats = () => API.get('/referral/stats');
export const generateReferralCode = () => API.post('/referral/generate');
export const applyReferralCode = (code) =>
  API.post('/referral/apply', {referralCode: code});

// ─── PRICE MATCH ──────────────────────────────────────────────
export const getPriceMatchRates = (toCurrency) =>
  API.get(`/pricematch/rates?toCurrency=${toCurrency}`);
export const verifyPriceMatch = (formData) =>
  API.post('/pricematch/verify', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

export default API;