import React from 'react'
import Avatar from '@material-ui/core/Avatar'

import { baseURL } from '../constants/constants'

const getImageUrl = (imageUrl) => {
  if (imageUrl[0] !== '/' || imageUrl.includes('http')) return imageUrl
  return `${baseURL}${imageUrl}`
}

const CustomAvatar = (props) => {
  const { src, alt, ...others } = props
  if (!src) {
    return <Avatar alt={'loading'} {...others} />
    // return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...others}>
    //   <HashLoader color={colors.primary}/>
    // </div>
  }
  return (
    <Avatar src={getImageUrl(src.url || src)} alt={alt} {...others} />
  )
}

export default CustomAvatar