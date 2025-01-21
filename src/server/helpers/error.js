import "server-only";

class ServerCustomError extends Error {
    message;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default ServerCustomError;