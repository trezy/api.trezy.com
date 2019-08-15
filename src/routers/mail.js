// Module imports
import mail from '@sendgrid/mail'
import Mailgen from 'mailgen'
import Router from 'koa-router'





// Local constants
const {
  MAIL_DESTINATION,
  SENDGRID_API_KEY,
} = process.env
const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
      name: 'Trezy.com',
      link: 'https://trezy.com/',
      logo: 'https://trezy.com/static/images/logos/trezy.svg',
  }
})
const mailRouter = new Router({ prefix: '/mail' })





mail.setApiKey(SENDGRID_API_KEY)





mailRouter.post('/', async context => {
  const requestBody = context.request.body
  const content = { body: { intro: requestBody.message } }
  const message = {
    from: {
      email: requestBody.email,
      name: requestBody.name,
    },
    html: mailGenerator.generate(content),
    subject: `${requestBody.name} has sent you a message`,
    text: mailGenerator.generatePlaintext(content),
    to: MAIL_DESTINATION,
  }

  await mail.send(message)
})





export { mailRouter }
