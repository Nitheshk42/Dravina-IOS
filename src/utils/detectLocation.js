import { getUserLocation } from '../services/api';

const CURRENCIES = [
  { code: 'USD', isoCode: 'US' },
  { code: 'INR', isoCode: 'IN' },
  { code: 'GBP', isoCode: 'GB' },
  { code: 'EUR', isoCode: 'EU' },
  { code: 'AUD', isoCode: 'AU' },
  { code: 'CAD', isoCode: 'CA' },
  { code: 'SGD', isoCode: 'SG' },
  { code: 'AED', isoCode: 'AE' },
];

const COUNTRY_CURRENCY_MAP = {
  US: 'USD', IN: 'INR', GB: 'GBP', AU: 'AUD', CA: 'CAD',
  SG: 'SGD', AE: 'AED', DE: 'EUR', FR: 'EUR', IT: 'EUR',
  ES: 'EUR', NL: 'EUR', IE: 'EUR', NZ: 'AUD',
};

export const detectUserCurrency = async () => {
  try {
    const res = await getUserLocation();
    const code = COUNTRY_CURRENCY_MAP[res.data.countryCode];
    if (code) return CURRENCIES.find(c => c.code === code) || CURRENCIES[0];
  } catch (error) {
    console.log('Location detection failed, defaulting to USD');
  }
  return CURRENCIES[0]; // default USD
};

export const getCurrencyForCountry = (country) => {
  const map = {
    'India': 'INR',
    'United Kingdom': 'GBP',
    'Europe': 'EUR',
    'Germany': 'EUR',
    'France': 'EUR',
    'Australia': 'AUD',
    'Canada': 'CAD',
    'Singapore': 'SGD',
    'UAE': 'AED',
    'United States': 'USD',
  };
  return map[country] || 'USD';
};