const { readFile, writeFile } = require('fs/promises')
class HeroRepository {
  constructor({ file }) {
    this.file = file
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file, ))
  }

  async _getHeroIndex(heroId) {
    let allHeros = await this._currentFileContent()
    const heroIndex = allHeros.findIndex(({ id }) => heroId === id)

    return { allHeros, heroIndex }
  }

  async _writeFile(allHeros) {
    await writeFile(this.file, JSON.stringify(allHeros))
  }

  async find(heroId) {
    const allHeros = await this._currentFileContent()
    if(!heroId) return allHeros

    return allHeros.find(({ id }) => heroId === id)
  }

  async create(hero) {
    const allHeros = await this._currentFileContent()
    allHeros.push(hero)

    await this._writeFile(allHeros)

    return hero.id
  }

  async update(heroId, newAtributes) {
    const { allHeros, heroIndex } = await this._getHeroIndex(heroId)
    const heroUpdated = Object.assign(allHeros[heroIndex], newAtributes)

    await this._writeFile(allHeros)

    return heroUpdated.id
  }

  async delete(heroId) {
    const { allHeros, heroIndex } = await this._getHeroIndex(heroId)
    let heroDeleted = allHeros.splice(heroIndex, 1)

    await this._writeFile(allHeros)

    return heroDeleted
  }
}

module.exports = HeroRepository
