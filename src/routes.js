const { DEFAULT_HEADER, Responses, RequestErrors } = require('./infra')
const HeroFactory = require('./factories/heroFactory')
const heroService = HeroFactory.generateInstance()
const Hero = require('./entities/hero')

const requestErrors = new RequestErrors(DEFAULT_HEADER)
const responses = new Responses(DEFAULT_HEADER)

const routes = {
  '/heroes:get': async (request, response) => {
    const { id } = request.queryString
    const heroes = await heroService.find(id)

    return responses.ok(response, {
      message: "",
      data: heroes || {}
    })
  },
  '/heroes:post': async (request, response) => {
    // async interator
    for await (const data of request) {
      try {
        const item = JSON.parse(data)
        const hero = new Hero(item)
        const { error, valid } = hero.isValid(hero)

        if(!valid) {
          return requestErrors.unprocessableEntity(response, error)
        }

        const id = await heroService.create(hero)

        return responses.created(response, {
          message: 'Hero Created with success',
          data: { id }
        })
      } catch (error) {
        return requestErrors.internalError(response, error)
      }
    }
  },
  '/heroes:put': async (request, response) => {
    for await (const data of request) {
      try {
        const { id } = request.queryString
        const item = JSON.parse(data)

        await heroService.update(id, item)

        return responses.noContent(response)
      } catch (error) {
        return requestErrors.internalError(response, error)
      }
    }
  },
  '/heroes:delete': async (request, response) => {
    try {
      const { id } = request.queryString
      const test = await heroService.delete(id)

      return responses.noContent(response)
    } catch(error) {
      return requestErrors.internalError(response, error)
    }
  },
  default: async (request, response) => {
    return requestErrors.notFound(response, {
      message: 'Route not found'
    })
  }
}

module.exports = routes
