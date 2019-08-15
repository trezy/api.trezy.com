// Module imports
import { transformStringCase } from 'transform-string-case'
import * as admin from 'firebase-admin'
import convertObjectKeys from 'convert-object-keys'
import Router from 'koa-router'





// Local constants
const {
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_AUTH_URI,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509_CERT_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_TOKEN_URI,
  FIREBASE_TYPE,
} = process.env
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
      auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      auth_uri: FIREBASE_AUTH_URI,
      client_email: FIREBASE_CLIENT_EMAIL,
      client_id: FIREBASE_CLIENT_ID,
      client_x509_cert_url: FIREBASE_CLIENT_X509_CERT_URL,
      project_id: FIREBASE_PROJECT_ID,
      private_key_id: FIREBASE_PRIVATE_KEY_ID,
      private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      token_uri: FIREBASE_TOKEN_URI,
      type: FIREBASE_TYPE,
  }),
  databaseURL: 'https://trezy-core.firebaseio.com'
})
const database = firebaseApp.database()
const twitchRouter = new Router({ prefix: '/twitch' })





twitchRouter.post('/stream-state', async context => {
  const isLive = Boolean(context.request.body.data.length)

  database.ref('/app-data/stream/online').set(isLive)
})





export { twitchRouter }
