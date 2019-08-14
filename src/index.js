/* eslint-env node */

// Import variables from .env file.
require('dotenv').config()




// Module imports
import Koa from 'koa'
import body from 'koa-body'
import compress from 'koa-compress'
import cors from '@koa/cors'
import logger from 'koa-logger'
import noTrailingSlash from 'koa-no-trailing-slash'
import Router from 'koa-router'
import path from 'path'





// Local imports
import {
  bodyBuilder,
  prepareNLP,
  statusCodeGenerator,
} from './middlewares'
import {
  pingRouter,
  twilioRouter,
  twitchRouter,
} from './routers'





// Constants
const { PORT } = process.env
const app = new Koa()
const router = new Router()





app.use(noTrailingSlash())
app.use(logger())
app.use(compress())
app.use(cors())
app.use(body())
app.use(statusCodeGenerator())
app.use(bodyBuilder())
app.use(prepareNLP())

router.use(pingRouter.routes())
router.use(twilioRouter.routes())
router.use(twitchRouter.routes())
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`HTTP Server listening on port ${PORT}`)
app.listen(PORT)
