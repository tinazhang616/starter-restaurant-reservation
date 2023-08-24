function isOnTuesday(str) {
  const [year, month, day] = str.split("-");
  const date = new Date(`${month} ${day}, ${year}`);
  let tues = date.getDay();
  if (tues === 2) {
    return true
  }
  return false;
}
module.exports = isOnTuesday;
