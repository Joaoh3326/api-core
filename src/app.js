const { DEFAULT_HEADER, Validations } = require('./infra')
const routes = require('./routes')

const validations = new Validations()

const handler = (request, response) => {
  const { url, method } = request;
  const [_, route, id] = url.split('/')
  let key = ''

  if( isNaN(id) && (!validations.isNull(id) && !validations.isUndefined(id)) ) {
    key = `/not_found`
  } else {
    request.queryString = { id: isNaN(id) ? id : Number(id) }
    key = `/${route}:${method.toLowerCase()}`
  }

  response.writeHead(200, DEFAULT_HEADER)

  const chosen = routes[key] || routes.default

  return chosen(request, response).then()
}

module.exports = handler
