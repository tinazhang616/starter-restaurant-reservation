function isOnTuesday(str) {
  let tues = new Date(str).getDay();
  if (tues+1 === 2) {
    return true
  }
  return false;
}
module.exports = isOnTuesday;
