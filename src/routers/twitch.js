// Module imports
import { transformStringCase } from 'transform-string-case'
import * as admin from 'firebase-admin'
import convertObjectKeys from 'convert-object-keys'
import Router from 'koa-router'





// Local imports
import firebaseCredentials from '../../firebase-credentials'





// Local constants
const {
  TMDB_API_KEY,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  TWILIO_SID,
} = process.env
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: 'https://trezy-core.firebaseio.com'
})
const database = firebaseApp.database()
const twitchRouter = new Router({ prefix: '/twitch' })





twitchRouter.post('/stream-state', async context => {
  const isLive = Boolean(context.request.body.data.length)

  database.ref('/app-data/stream/online').set(isLive)
})





export { twitchRouter }
