class Validations {
  isNull(value) {
    return value === null
  }

  isUndefined(value) {
    return value === undefined
  }

  isEmpty(value) {
    return value.length === 0
  }
}

module.exports = Validations
