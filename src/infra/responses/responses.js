class Responses {
  constructor(default_header) {
    this.DEFAULT_HEADER = default_header
  }

  _isEmpty(obj) {
    if (Array.isArray(obj)){
      return obj.length === 0;
    }

    return Object.keys(obj).length === 0;
  }

  _buildBody({ message, data }, statusCode) {
    return {
      success: true,
      statusCode,
      message,
      data
    }
  }

  _responseHandler(response, statusCode, objectSuccess) {
    response.writeHead(statusCode, this.DEFAULT_HEADER)

    if (!this._isEmpty(objectSuccess.data) || statusCode === 204) {
      response.write(JSON.stringify(this._buildBody(objectSuccess, statusCode)))
    }

    response.end()
  }

  created(response, objectSuccess) {
    return this._responseHandler(response, 201,objectSuccess)
  }

  ok(response, objectSuccess) {
    return this._responseHandler(response, 200,objectSuccess)
  }

  noContent(response) {
    return this._responseHandler(response, 204, { data: {} })
  }
}

module.exports = Responses
