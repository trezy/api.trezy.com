// Module imports
import { transformStringCase } from 'transform-string-case'
import convertObjectKeys from 'convert-object-keys'
import Router from 'koa-router'
import Tokenizer from 'wink-tokenizer'
import Twilio from 'twilio'





// Local imports
import { tmdbService } from '../services'





// Local constants
const {
  TMDB_API_KEY,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  TWILIO_SID,
} = process.env
const tokenizer = Tokenizer()
const twilio = new Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN)
const twilioRouter = new Router({ prefix: '/twilio' })





twilioRouter.post('/', async context => {
  const requestBody = convertObjectKeys(context.request.body, key => transformStringCase(key, 'upperCamel', 'camel'))

  const reply = async (requestBody, message) => {
    await twilio.messages.create({
      body: message,
      to: requestBody,
      from: TWILIO_PHONE_NUMBER,
    })
  }

  const { data } = await tmdbService().get('/search/movie', {
    params: {
      api_key: TMDB_API_KEY, /* eslint-disable-line camelcase */
      query: requestBody.body,
    },
    // transformResponse: response => {
    //   const parsedResponse = JSON.parse(response)
    //   const transformer = key => transformStringCase(key, 'snake', 'camel')
    //   const transformedResponse = convertObjectKeys(parsedResponse, transformer)

    //   return transformedResponse
    // },
  })

  console.log(data)

  // const tokenizedMessage = tokenizer.tokenize(requestBody.body)
  // const nerResult = context.nlp.ner.recognize(tokenizedMessage)

  // const movies = nerResult.filter(({ entityType }) => entityType === 'movie')

  // console.log(movies)
})





// Create new character
// twilioRouter.post('/new',
//   passport.authenticate('bearer', { session: false }),
//   async (context, next) => {
//     try {
//       const characterModel = new CharacterModel({
//         ...context.request.body,
//         userID: context.state.user.id,
//       })

//       characterModel.save()

//       context.data = characterModel.render()
//     } catch (error) {
//       context.status = 401
//       context.errors.push(error)
//     }
//   }
// )





export { twilioRouter }
