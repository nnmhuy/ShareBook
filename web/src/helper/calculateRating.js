const calculateRating = (totalOfRating, numberOfRating) => {
  if (isNaN(totalOfRating) || isNaN(numberOfRating)) return 0
  return (Math.round((totalOfRating / Math.max(numberOfRating, 1)) * 2) / 2).toFixed(1)
}

export default calculateRating