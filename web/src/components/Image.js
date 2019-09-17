import React from 'react'

import { baseURL } from '../constants/constants'

const getImageUrl = (imageUrl) => {
  return `${baseURL}${imageUrl}`
}

const Image = (props) => {
  const { src, alt, ...others } = props
  return (
    <img src={getImageUrl(src)} alt={alt} {...others} />
  )
}

export default Image