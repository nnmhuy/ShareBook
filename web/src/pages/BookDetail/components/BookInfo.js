import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { IconButton } from '@material-ui/core'
import { Button } from '@material-ui/core'

import Link from '../../../components/Link'
import Image from '../../../components/Image'

import { ReactComponent as StarIcon } from '../../../static/images/star.svg'
import { ReactComponent as BookmarkedIcon } from '../../../static/images/bookmarked.svg'
import { ReactComponent as UserIcon } from '../../../static/images/man-user.svg'
import { ReactComponent as ReportIcon } from '../../../static/images/alert.svg'

import colors from '../../../constants/colors'
import calculateRating from '../../../helper/calculateRating'

const styles = (theme => ({
  container: {
    textAlign: 'center',
    maxWidth: 800,
    margin: 'auto',
    padding: 20,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    position: 'relative'
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  imagePart: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 7,
  },
  rating: {
    justifyContent: 'center'
  },
  textPart: {
    flex: 1,
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'left',
    height: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: 600,
    fontSize: 16
  },
  author: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.gray
  },
  textItem: {
  },
  textTitle: {
    fontWeight: 600,
    fontSize: 12,
    color: '#000'
  },
  category: {
    fontWeight: 500,
    fontSize: 14,
    color: colors.primary
  },
  tag: {
    fontSize: 11,
    paddingRight: 5,
    lineHeight: 1.5,
    color: colors.textSecondary,
    fontWeight: 500,
  },
  divider: {
    color: '#000'
  },
  numberSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  numberItem: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  numberLabel: {
    fontWeight: 500,
    fontSize: 11,
    color: '#717171',
    textAlign: 'center'
  },
  numberContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  numberWrapper: {
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 1.3,
    color: colors.gray
  },
  numberIconLeft: {
    height: 11,
    width: 'auto',
    marginRight: 5
  },
  numberIconRight: {
    height: 11,
    width: 'auto',
    marginLeft: 5
  },
  reportLink: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  editLink: {
    position: 'absolute',
    top: 155,
    right: 5
  },
  reportIcon: {
    width: 15,
    height: 15
  },
  editBookButton: {
    width: 50,
    // borderRadius: '0px 6px 6px 0px',
    background: colors.primary,
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: 14
  },
}))

const BookInfo = (props) => {
  const { classes, image, totalOfRating, numberOfRating, name, author, tags = [],
    numberOfBookmarks, numberOfUse, category, id, role } = props
  let isSuperAdmin = role === "superAdmin"
  const rating = calculateRating(totalOfRating, numberOfRating)
  return (
    <div className={classes.container}>
      <Link to={`/report/book-${id}`} className={classes.reportLink}>
        <IconButton>
          <ReportIcon className={classes.reportIcon} />
        </IconButton>
      </Link>
      {isSuperAdmin &&
      <Link to={`/edit-book/${id}`} className={classes.editLink}>
        <Button className={classes.editBookButton}>Sửa</Button>
      </Link>}
      <div className={classes.infoSection}>
        <div className={classes.imagePart}>
          <Image src={image} className={classes.image} alt={name} />
          <Rating
            className={classes.rating}
            value={rating}
            precision={0.5}
            readOnly
          />
        </div>
        <div className={classes.textPart}>
          <div className={classes.textItem}>
            <div className={classes.name}>
              {name}
              <span className={classes.author}>{`   ${author}`}</span>
            </div>
          </div>
          <div className={classes.textItem}>
            <div className={classes.textTitle}>Thể loại</div>
            <Link className={classes.category} to={`${category.url}`}>{category.name}</Link>
          </div>
          <div className={classes.textItem}>
            <div className={classes.textTitle}>Tags</div>
            {tags.map((tag, id) => {
              return (
                <span key={tag + id} className={classes.tag}>
                  {tag}
                  {id + 1 < tags.length && <span className={classes.divider}>{` / `}</span>}
                </span>
              )
            })}
          </div>
        </div>
      </div>
      <div className={classes.numberSection}>
        <div className={classes.numberItem}>
          <div className={classes.numberLabel}>Đánh giá</div>
          <div className={classes.numberContainer}>
            <StarIcon className={classes.numberIconLeft} fill={colors.primary} />
            <span className={classes.numberWrapper}>
              <span className={classes.number} style={{ color: '#fd8824' }}>
                {rating}
              </span>
              {` / 5`}
            </span>
          </div>
        </div>
        <div className={classes.numberItem}>
          <div className={classes.numberLabel}>Bookmark</div>
          <div className={classes.numberContainer}>
            <span className={classes.numberWrapper}>
              <span className={classes.number} style={{ color: colors.primary }}>
                {numberOfBookmarks}
              </span>
            </span>
            <BookmarkedIcon className={classes.numberIconRight} fill={colors.primary}/>
          </div>
        </div>
        <div className={classes.numberItem}>
          <div className={classes.numberLabel}>Lượt mượn</div>
          <div className={classes.numberContainer}>
            <span className={classes.numberWrapper}>
              <span className={classes.number} style={{ color: '#0C4F8E' }}>
                {numberOfUse}
              </span>
            </span>
            <UserIcon className={classes.numberIconRight} fill='#0C4F8E' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(BookInfo)