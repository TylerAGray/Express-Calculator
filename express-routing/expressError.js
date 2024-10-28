/** 
 * ExpressError extends the normal JS error so we can easily
 * add a status code when we create an instance of it.
 * 
 * This custom error class allows us to include both an error message
 * and an HTTP status code, which can be useful in Express.js applications 
 * for handling and reporting errors consistently.
 *
 * The error-handling middleware in Express can use this class to return
 * error responses with both a message and status code.
 */
class ExpressError extends Error {
  
  /**
   * Create an instance of ExpressError.
   * 
   * @param {string} message - The error message to be displayed or logged.
   * @param {number} status - The HTTP status code for the error.
   */
  constructor(message, status) {
    super();  // Call the parent class (Error) constructor.
    this.message = message;  // Assign the custom error message.
    this.status = status;    // Assign the custom HTTP status code.
    console.error(this.stack);  // Log the stack trace for debugging purposes.
  }
}

module.exports = ExpressError;  // Export the ExpressError class for use in other modules.
