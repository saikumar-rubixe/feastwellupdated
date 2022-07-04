// to check the value passed is number or not
// used in updation,delete  and get by id functions
const checkNumber = function isNumeric(num) {
  return !isNaN(num);
};

module.exports = { checkNumber };
