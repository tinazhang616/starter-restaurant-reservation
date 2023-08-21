function valid_time(str) {
  if (!str.includes(":")) {
    return false;
  }
  // console.log("this is time",str)
  let time = str.split(":");
  let result = false;
  for (let i = 0; i < time.length; i++) {
    if (i === 0) {
      if (+time[i] < 24 && +time[i] >= 0) {
        result = true;
      } else {
        return false;
      }
    }
    if (i === 1) {
      if (+time[i] <= 59 && +time[i] >= 0) {
        result = true;
      } else {
        return false;
      }
    }
  }
  return result;
}
module.exports = valid_time;
