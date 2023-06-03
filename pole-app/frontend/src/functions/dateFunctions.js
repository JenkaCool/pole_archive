const getCurrentDate = function(separator='-') {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let time = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
  month = month < 10 ? '0' + month : month;
  let result = year + '-' + month + '-' + date + ' ' + time;
  return result
}

export default getCurrentDate;
