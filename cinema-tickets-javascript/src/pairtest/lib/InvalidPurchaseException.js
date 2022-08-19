export default class InvalidPurchaseException extends Error {
  constructor(message, error) {
    super(message)
    this.error = error
  }
}
