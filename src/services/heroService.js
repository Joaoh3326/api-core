const { Validations } = require('../infra')
const validations = new Validations()

class HeroService {
  constructor({ heroRepository }) {
    this.heroRepository = heroRepository
  }

  async find(heroId) {
    return this.heroRepository.find(heroId)
  }

  async create(data) {
    return this.heroRepository.create(data)
  }

  async update(heroId, data) {
    const hero = await this.heroRepository.find(heroId)

    if (validations.isUndefined(hero)) {
      return []
    }

    const propertyNames = Object.getOwnPropertyNames(data)
    propertyNames.forEach(property => {
      if (!!hero[property]) hero[property] = data[property]
    })

    return this.heroRepository.update(heroId, hero)
  }

  async delete(heroId) {
    return this.heroRepository.delete(heroId)
  }
}

module.exports = HeroService
