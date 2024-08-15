class BhaiClientError extends Error {
constructor(message) {
super(`[BHAI ERROR] ${message}`);
this.name = 'BhaiClientError';
}
}

module.exports = BhaiClientError;
