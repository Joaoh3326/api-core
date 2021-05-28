class RequestErrors {
  constructor(default_header) {
    this.DEFAULT_HEADER = default_header
  }

  _buildBody({ message, data }, statusCode) {
    return {
      success: false,
      statusCode,
      message,
      data
    }
  }

  _handlerError(response, statusCode, error) {
    console.error('Deu Ruim!***', error)
    response.writeHead(statusCode, this.DEFAULT_HEADER)

    response.write(JSON.stringify(this._buildBody({
      message: error.message,
      data: error
    }, statusCode)))

    return response.end()
  }

  internalError(response, error) {
    return this._handlerError(response, 500, error)
  }

  unprocessableEntity(response, error) {
    return this._handlerError(response, 422, error)
  }

  notFound(response, error) {
    return this._handlerError(response, 404, error)
  }
}

module.exports = RequestErrors
