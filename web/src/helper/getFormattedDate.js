const getFormattedDate = (date) => {
  let createdYMD = date.split('T')[0].split('-');
  let day = createdYMD[2];
  let month = createdYMD[1];
  let year = createdYMD[0];
  let formattedDate = day + '-' + month + '-' + year;
  return formattedDate;
}

export default getFormattedDate