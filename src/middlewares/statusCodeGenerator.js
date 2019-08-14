const statusCodeGenerator = () => async (context, next) => {
  await next()

  const {
    body,
    matched,
    status,
  } = context

  if (!matched.length) {
    context.status = 404
  } else if (!status || (status === 200)) {
    if (body.data) {
      context.status = 200
    } else if (body.errors) {
      context.status = 500
    } else {
      context.status = 204
    }
  }
}





export { statusCodeGenerator }
