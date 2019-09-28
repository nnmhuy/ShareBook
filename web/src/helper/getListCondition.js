import _ from 'lodash'

function getListCondition(name) {
  let object = localStorage.getItem(name)
  try {
  if (!object || object === 'false') object = false
  else object = JSON.parse(object)
  } catch (err) {
    localStorage.setItem(name, false)
    return false
  }
  

  if (object.all) return false
  let resultArray = []
  _.mapKeys(object, function(value, key) {
    if (value)
      resultArray.push(key)
  });
  if (resultArray.length === 0)
    return false
  return resultArray
}

export default getListCondition