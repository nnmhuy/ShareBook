import React from 'react'

import { baseURL } from '../constants/constants'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = (props) => {
  const { src, alt, isStatic, ...others } = props

  const getImageUrl = (imageUrl) => {
    if (imageUrl[0] !== '/' || imageUrl.includes('http') || isStatic) return imageUrl
    return `${baseURL}${imageUrl}`
  }

  if (!src) {
    return (
      <LazyLoadImage
        alt={alt}
        src={src} // use normal <img> attributes as props
        {...others}
      />
    )
    // return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...others}>
    //   <HashLoader color={colors.primary}/>
    // </div>
  }
  return (
    <LazyLoadImage
      alt={alt}
      // src={src.url || src}
      src={getImageUrl(src.url || src)} // use normal <img> attributes as props
      {...others}
      style={{ objectFit: 'cover', fontSize: 10 }}
    />
  )
}

export default Image