const BASE_AUTH_API_URL = 'https://marina-market-auth-api-c4pc-dev.fl0.io'
const BASE_MARKET_API_URL = 'https://marina-market-inventory-api-j358-dev.fl0.io'

// AUTH
export const AUTH_LOGIN_API_URL = BASE_AUTH_API_URL + '/auth/login'

// MARKET
export const CREATE_PRODUCT_API_URL = BASE_MARKET_API_URL + '/product/create'
export const CREATE_OFFER_API_URL = BASE_MARKET_API_URL + '/product/create/offer'

// Get product information
export const PRODUCT_API_URL = BASE_MARKET_API_URL + '/product'
// Get categories
export const CATEGORIES_API_URL = BASE_MARKET_API_URL + '/product/categories'
// Get type of stock
export const TYPE_STOCK_API_URL = BASE_MARKET_API_URL + '/product/type-stock'
