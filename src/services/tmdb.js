// Module imports
import axios from 'axios'





// Local constants
const { TMDB_API_URL } = process.env

let instance = null





const tmdbService = () => {
  console.log('TMDB_API_URL', TMDB_API_URL)
  if (!instance) {
    instance = axios.create({
      baseURL: TMDB_API_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    })
  }

  return instance
}





export { tmdbService }
