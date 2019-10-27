const addZero = (number) => {
  if (number < 10) {
    return '0' + number.toString()
  }
  return number.toString();
}

const getFormattedDate = (date, getFullFormat = false, dateFormat = false, secondFormat = false) => {
  if (!date) return
  const _date = new Date(date);
  const today = new Date();
  const day = addZero(_date.getDate());
  const month = addZero(_date.getMonth() + 1);
  const year = addZero(_date.getFullYear());
  const hours = addZero(_date.getHours());
  const min = addZero(_date.getMinutes())
  const sec = addZero(_date.getSeconds())
  const formattedDate = day + '-' + month + '-' + year;
  const formattedTime = hours + ':' + min;
  const formattedSecond = hours + ':' + min + ':' + sec;

  if (getFullFormat && !secondFormat) return formattedDate + ' ' + formattedTime;
  if (dateFormat) return formattedDate;
  if (!getFullFormat && secondFormat) return formattedSecond;

  if (
    today.getDate() === _date.getDate() &&
    today.getMonth() === _date.getMonth() &&
    today.getFullYear() === _date.getFullYear()
  ) {
    if (secondFormat) return formattedSecond
    return formattedTime;
  } else {
    return formattedDate;
  }
}

export default getFormattedDate