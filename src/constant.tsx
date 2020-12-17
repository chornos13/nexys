const env = process.env.URL_ENV || 'development'

const mapApiUrl = {
  development: 'http://localhost:5000/v1',
}

export const BASE_API_URL = mapApiUrl[env]

export default {}
