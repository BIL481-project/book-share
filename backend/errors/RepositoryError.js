const CustomError = require('./CustomError');

class RepositoryError extends CustomError {
    constructor(message) {
        super(message, 'RepositoryError', 500);
    }
}

module.exports = RepositoryError;