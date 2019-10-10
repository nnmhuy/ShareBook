const addZero = (number) => {
  if (number < 10) {
    return '0' + number.toString()
  }
  return number.toString();
}

const getFormattedDate = (date) => {
  const _date = new Date(date);
  const today = new Date();
  if (
    today.getDate() === _date.getDate() &&
    today.getMonth() === _date.getMonth() &&
    today.getFullYear() === _date.getFullYear()
  ) {
    const hours = addZero(_date.getHours());
    const min = addZero(_date.getMinutes())
    const formattedTime = hours + ':' + min;
    return formattedTime;
  } else {
    const day = addZero(_date.getDate());
    const month = addZero(_date.getMonth()+1);
    const year = addZero(_date.getFullYear());
    const formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
  }
}

export default getFormattedDate