const express = require('express');  // Import the Express framework.
const app = express();  // Create an instance of the Express application.
const ExpressError = require('./expressError');  // Import the custom error handling class.

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');  // Import helper functions.

/**
 * Route for calculating the mean.
 * The request must include a query parameter `nums` with a comma-separated list of numbers.
 * Example: /mean?nums=1,2,3,4,5
 */
app.get('/mean', function(req, res, next) {
  // If the query string `nums` is missing, throw a 400 Bad Request error.
  if (!req.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
  }

  let numsAsStrings = req.query.nums.split(',');  // Split the comma-separated string into an array of strings.
  // Convert strings to numbers and check if there are invalid inputs.
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);  // If there's an error during conversion, throw an error with the message.
  }

  // Create the result object with the operation name and the calculated mean.
  let result = {
    operation: "mean",
    result: findMean(nums)  // Use the helper function to calculate the mean.
  };

  return res.send(result);  // Send the result back as a response.
});

/**
 * Route for calculating the median.
 * The request must include a query parameter `nums` with a comma-separated list of numbers.
 * Example: /median?nums=1,2,3,4,5
 */
app.get('/median', function(req, res, next) {
  // If the query string `nums` is missing, throw a 400 Bad Request error.
  if (!req.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
  }

  let numsAsStrings = req.query.nums.split(',');  // Split the comma-separated string into an array of strings.
  // Convert strings to numbers and check if there are invalid inputs.
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);  // If there's an error during conversion, throw an error with the message.
  }

  // Create the result object with the operation name and the calculated median.
  let result = {
    operation: "median",
    result: findMedian(nums)  // Use the helper function to calculate the median.
  };

  return res.send(result);  // Send the result back as a response.
});

/**
 * Route for calculating the mode.
 * The request must include a query parameter `nums` with a comma-separated list of numbers.
 * Example: /mode?nums=1,2,3,3,3,4,5
 */
app.get('/mode', function(req, res, next) {
  // If the query string `nums` is missing, throw a 400 Bad Request error.
  if (!req.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
  }

  let numsAsStrings = req.query.nums.split(',');  // Split the comma-separated string into an array of strings.
  // Convert strings to numbers and check if there are invalid inputs.
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);  // If there's an error during conversion, throw an error with the message.
  }

  // Create the result object with the operation name and the calculated mode.
  let result = {
    operation: "mode",
    result: findMode(nums)  // Use the helper function to calculate the mode.
  };

  return res.send(result);  // Send the result back as a response.
});

/** General 404 error handler for undefined routes.
 *  If no route matches, this middleware is triggered.
 */
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);  // Create a new 404 Not Found error.
  
  // Pass the error to the next error-handling middleware.
  return next(err);
});

/** General error handler for all other errors.
 *  This middleware catches any errors thrown in the application, formats the error response,
 *  and sends it back to the client with the appropriate HTTP status code.
 */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);  // Set the status to the error status or default to 500 Internal Server Error.

  return res.json({
    error: err,  // Return the error object.
    message: err.message  // Return the error message.
  });
});

/** Start the server on port 3000 */
app.listen(3000, function() {
  console.log(`Server starting on port 3000`);
});
