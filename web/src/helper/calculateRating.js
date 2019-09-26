const calculateRating = (totalOfRating, numberOfRating) => {
  if (isNaN(totalOfRating) || isNaN(numberOfRating)) return 0
  let answer = (Math.round((totalOfRating / Math.max(numberOfRating, 1)) * 2) / 2).toFixed(1)
  if (typeof answer === 'string')
    answer = parseInt(answer)
  return answer
}

export default calculateRating