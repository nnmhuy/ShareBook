import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { Button } from '@material-ui/core'
import LinesEllipsis from 'react-lines-ellipsis'
import Badge from '@material-ui/core/Badge'

import Link from './Link'
import Image from './Image'

import colors from '../constants/colors'
import { ReactComponent as UserIcon } from '../static/images/man-user.svg'
import { ReactComponent as BookmarkIcon } from '../static/images/bookmark.svg'
import { ReactComponent as BookmarkedIcon } from '../static/images/bookmarked.svg'

const styles = (theme => ({
  container: {
    marginTop: 60,
    boxSizing: 'border-box',
    padding: '12px 10px',
    width: 330,
    height: 132,
    borderRadius: 12,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.16)',
    display: 'flex',
    alignItems: 'flex-end'
  },
  imageContainer: {

  },
  image: {
    height: 150,
    width: 100,
    display: 'inline-block'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 1.7,
    color: '#000',
  },
  author: {
    fontWeight: 500,
    fontSize: 10,
    color: colors.gray
  },
  infoContainer: {
    display: 'inline-block',
    flex: 1,
    height: '100%',
    marginLeft: 12,
    position: 'relative'
  },
  bookmarkIcon: {
    height: 12.3,
    width: 'auto',
    position: 'absolute',
    cursor: 'pointer',
    top: 10,
    right: 12
  },
  rating: {
    fontSize: 12,
    marginTop: 6
  },
  numberOfUser: {
    // display: 'flex',
    // alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    fontWeight: 600,
    fontSize: 11,
    lineHeight: 2.3,
    color: colors.primary
  },
  userIcon: {
    height: 11,
    width: 'auto',
    marginLeft: 2
  },
  borrowButton: {
    width: 83,
    height: 28,
    background: colors.primary,
    filter: 'drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.16))',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 11,
    color: '#fff',
    textShadow: '0px 1px 6px rgba(0, 0, 0, 0.16)',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  customBadge: {
    backgroundColor: '#30c37c',
    width: 8,
    height: 8
  }
}))

const Book = (props) => {
  const { classes, id, name, author, image, isBookmarked, rating, numberOfUse, bookmarkId, handleToggleBookmark, totalOfBookInstance } = props
  const onBookmark = () => {
    handleToggleBookmark(id, bookmarkId, !isBookmarked)
  }

  return (
    <div className={classes.container} >
      <Link to={`/book-detail/${id}`} className={classes.imageContainer}>
        <Badge classes={{ badge: classes.customBadge }} variant="dot" invisible={totalOfBookInstance === 0 ? true : false}>
          <Image src={image} alt={name} className={classes.image} />
        </Badge>
      </Link>
      <div className={classes.infoContainer}>
        <div className={classes.name}>
          <Link to={`/book-detail/${id}`}>
            <LinesEllipsis
              text={name}
              maxLine='2'
              ellipsis='..'
              trimRight
              basedOn='words'
            />
          </Link>
        </div>
        <div className={classes.author}>
          <LinesEllipsis
            text={author}
            maxLine='1'
            ellipsis='..'
            trimRight
            basedOn='words'
          />
        </div>
        <Rating value={rating} precision={0.5} readOnly className={classes.rating} />
        {isBookmarked ?
          <BookmarkedIcon className={classes.bookmarkIcon} onClick={onBookmark} />
          :
          <BookmarkIcon className={classes.bookmarkIcon} onClick={onBookmark} />
        }
        <span className={classes.numberOfUser}>
          {numberOfUse}
          <UserIcon fill={colors.primary} className={classes.userIcon} />
        </span>
        <Link to={'/create-transaction'}>
          <Button className={classes.borrowButton}>Mượn sách</Button>
        </Link>
      </div>
    </div>
  )
}

export default withStyles(styles)(Book)