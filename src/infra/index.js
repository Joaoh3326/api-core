const RequestErrors = require('./errors/RequestErrors')
const Responses = require('./responses/responses')
const Validations = require('./validations/validations')

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

module.exports = {
  RequestErrors,
  Responses,
  Validations,
  DEFAULT_HEADER
}
