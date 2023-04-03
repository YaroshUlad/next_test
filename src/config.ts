export const NODE_ENV = process.env.NODE_ENV
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3010'
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || ''

// export const API_URL = `${SERVER_URL}/api/v${API_VERSION}`
export const API_URL = `${SERVER_URL}`