const CustomError = require('./CustomError');

class ServiceError extends CustomError {
    constructor(message) {
        super(message, 'ServiceError', 500);
    }
}

module.exports = ServiceError;