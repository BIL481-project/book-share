class CustomError extends Error {
    constructor(message, name, statusCode) {
        super(message);
        this.name = name || 'CustomError'; // Hata türü ismi
        this.statusCode = statusCode || 500; // Varsayılan HTTP kodu
    }
}

module.exports = CustomError;