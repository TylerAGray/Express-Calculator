/**
 * Build a frequency counter object from an array
 * @param {Array} arr - An array from which to build the frequency counter.
 * @returns {Object} - An object where the keys are array elements, and the values are the count of each element.
 * 
 * This function takes an array and creates an object that tracks the frequency of each element in the array.
 * It uses `reduce()` to accumulate the count of each element in the array.
 */
function createFrequencyCounter(arr) {
  return arr.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;  // Increment the count for each element or initialize it to 1 if it doesn't exist.
    return acc;
  }, {});
}

/**
 * Find the most common element (mode) in the array.
 * @param {Array} arr - An array of elements.
 * @returns {number} - The most frequent element in the array.
 * 
 * This function uses the frequency counter created by `createFrequencyCounter()` to determine 
 * which element occurs most frequently. It returns the element with the highest count.
 */
function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);  // Get the frequency of each element in the array.

  let count = 0;
  let mostFrequent;

  // Iterate through the frequency counter object to find the element with the highest count.
  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;  // Update the most frequent element.
      count = freqCounter[key];  // Update the highest frequency count.
    }
  }

  return +mostFrequent;  // Return the most frequent element as a number.
}

/**
 * Attempt to convert an array of strings to an array of numbers.
 * @param {Array} numsAsStrings - An array of string representations of numbers.
 * @returns {Array|Error} - Returns an array of numbers if valid, or an error object if conversion fails.
 * 
 * This function iterates through an array of strings, attempting to convert each to a number. 
 * If any element cannot be converted, it returns an error message specifying the invalid element.
 */
function convertAndValidateNumsArray(numsAsStrings) {
  let result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    let valToNumber = Number(numsAsStrings[i]);

    // If the conversion results in NaN, return an error with details about the invalid value.
    if (Number.isNaN(valToNumber)) {
      return new Error(
        `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
      );
    }

    result.push(valToNumber);  // If valid, push the number into the result array.
  }
  return result;  // Return the array of converted numbers.
}

/**
 * Find the mean (average) of an array of numbers.
 * @param {Array} nums - An array of numbers.
 * @returns {number} - The mean of the numbers.
 * 
 * This function calculates the mean by summing all the numbers in the array and dividing by the array's length.
 * If the array is empty, it returns 0.
 */
function findMean(nums){
  if(nums.length === 0) return 0;  // Handle empty array case.
  return nums.reduce(function (acc, cur) {
    return acc + cur;  // Sum all the numbers in the array.
  }) / nums.length  // Divide the sum by the total number of elements to get the mean.
}

/**
 * Find the median of an array of numbers.
 * @param {Array} nums - An array of numbers.
 * @returns {number} - The median of the numbers.
 * 
 * This function first sorts the array in ascending order, then calculates the median.
 * If the array has an odd number of elements, it returns the middle element.
 * If the array has an even number of elements, it returns the average of the two middle elements.
 */
function findMedian(nums){
  nums.sort((a, b) => a - b);  // Sort the numbers in ascending order.

  let middleIndex = Math.floor(nums.length / 2);  // Get the index of the middle element.
  let median;

  // If the array has an even length, calculate the average of the two middle elements.
  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    // If the array has an odd length, return the middle element.
    median = nums[middleIndex];
  }
  return median;
}

module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray
};

