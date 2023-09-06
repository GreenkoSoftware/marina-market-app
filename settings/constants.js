const BASE_AUTH_API_URL = 'https://marina-market-auth-api-c4pc-dev.fl0.io'
const BASE_MARKET_API_URL = 'https://marina-market-inventory-api-j358-dev.fl0.io'

// AUTH
export const AUTH_LOGIN_API_URL = BASE_AUTH_API_URL + '/auth/login'

// MARKET
export const CREATE_PRODUCT_API_URL = BASE_MARKET_API_URL + '/product/create'

// Get product information
export const PRODUCT_API_URL = BASE_MARKET_API_URL + '/product'
// Get categories
export const CATEGORIES_API_URL = BASE_MARKET_API_URL + '/product/categories'
// Get type of stock
export const TYPE_STOCK_API_URL = BASE_MARKET_API_URL + '/product/type-stock'
// Get type of payment
export const TYPE_PAYMENT_API_URL = BASE_MARKET_API_URL + '/payment'
// Get type of voucher
export const TYPE_VOUCHER_API_URL = BASE_MARKET_API_URL + '/voucher'

// Get offer
export const PRODUCT_OFFER = BASE_MARKET_API_URL + '/product/offer'

// Creat list
export const SALE_TICKET_CREATE = BASE_MARKET_API_URL + '/sale-ticket/create'
