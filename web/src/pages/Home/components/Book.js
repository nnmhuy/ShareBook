import React from 'react'
import { withStyles } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Link from '../../../components/Link'

import { maxMobileWidth } from '../../../constants/constants'

import { ReactComponent as HandBook } from '../../../static/images/hand-book.svg'
import { ReactComponent as HeartFull } from '../../../static/images/heart-full.svg'
import { ReactComponent as Heart } from '../../../static/images/heart.svg'

const medalImages = [
  null,
  require('../../../static/images/gold-medal.png'),
  require('../../../static/images/silver-medal.png'),
  require('../../../static/images/bronze-medal.png')
]

const styles = (theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: 180,
    height: 300,
    padding: 20
  },
  mobileWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 180,
    padding: 20
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 6,
    boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.5)',
    padding: '10px 5px'
  },
  medal: {
    position: 'absolute',
    width: '25%',
    height: 'auto',
    top: 0,
    left: 0,
    zIndex: 1000
  },
  likeContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 15,
    width: '20%',
    height: '13%',
    zIndex: 1000,
    borderRadius: '0px 0px 7px 7px',
    background: '#fff',
    boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.56)',
    cursor: 'pointer'
  },
  like: {
    width: '70%',
    height: '70%',
  },
  imageContainer: {
    position: 'relative',
    width: '95%',
    height: '95%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemsContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: 0,
    left: 0,
    background: '#fff',
    width: 60,
    height: 16,
    borderRadius: '0px 5px 0px 0px'
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  itemIcon: {
    width: 8.76,
    height: 'auto'
  },
  itemNumber: {
    fontWeight: 600,
    fontSize: 8,
    paddingLeft: 5
  },
  name: {
    fontWeight: 600,
    fontSize: 10,
    marginTop: 5
  }
}))

const Book = (props) => {
  const { 
    classes,
    id,
    name,
    image,
    numberOfLike,
    numberOfUse,
    hot,
    isLiked
  } = props
  const mobile = useMediaQuery(`(max-width:${maxMobileWidth})`)
  return (
    <Link to={`/book-detail/${id}`}>
      <div className={mobile ? classes.mobileWrapper : classes.wrapper}>
        {medalImages[hot] && <img src={medalImages[hot]} alt='Hot' className={classes.medal}/>}
        <div className={classes.container}>
          <span className={classes.likeContainer}>
            {isLiked ? 
                <HeartFull className={classes.like}/>
              :
                <Heart className={classes.like}/>
            }
          </span>
          <div className={classes.imageContainer}>
            <img src={image} alt='Book' className={classes.image}/>
            <div className={classes.itemsContainer}>
              <div className={classes.itemContainer}>
                <HandBook className={classes.itemIcon}/>
                <span className={classes.itemNumber}>
                  {numberOfLike}
                </span>
              </div>
              <div className={classes.itemContainer}>
                <HeartFull className={classes.itemIcon}/>
                <span className={classes.itemNumber}>
                  {numberOfUse}
                </span>
              </div>
            </div>
          </div>
          <span className={classes.name}>{name}</span>
        </div>
      </div>
    </Link>
  )
}

export default withStyles(styles)(Book)
