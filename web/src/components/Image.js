import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

import { baseURL } from '../constants/constants'
import colors from '../constants/colors'

const getImageUrl = (imageUrl) => {
  if (imageUrl[0] !== '/' || imageUrl.includes('http')) return imageUrl
  return `${baseURL}${imageUrl}`
}

const Image = (props) => {
  const { src, alt, ...others } = props
  if (!src) {
    return <img alt={'loading'} {...others} />
    // return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...others}>
    //   <HashLoader color={colors.primary}/>
    // </div>
  }
  return (
    <img src={getImageUrl(src.url || src)} alt={alt} {...others} style={{ objectFit: 'cover'}}/>
  )
}

export default Image