import "server-only";

const responseStatus = {
    ok: 200,
    created: 201,
    badRequest: 400,
    unAuthorized: 401,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    conflict: 409,
    unsupportedMediaType: 415,
    tooManyRequests: 429,
    internalServerError: 500,
    badGateway: 502,
    serviceUnavailable: 503,
}

export default responseStatus;