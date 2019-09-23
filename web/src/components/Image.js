import React from 'react'

import { baseURL } from '../constants/constants'

const getImageUrl = (imageUrl) => {
  if (imageUrl[0] !== '/' || imageUrl.includes('http')) return imageUrl
  return `${baseURL}${imageUrl}`
}

const Image = (props) => {
  const { src, alt, ...others } = props
  if (!src) {
    return <img alt={'loading'} {...others} />
  }
  return (
    <img src={getImageUrl(src)} alt={alt} {...others} />
  )
}

export default Image