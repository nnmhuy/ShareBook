import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { IconButton } from '@material-ui/core'

import Link from '../../components/Link'

import { ReactComponent as LikeIcon } from '../../static/images/like-filled.svg'
import { ReactComponent as HeartIcon } from '../../static/images/heart-full.svg'
import { ReactComponent as UserIcon } from '../../static/images/man-user.svg'
import { ReactComponent as ReportIcon } from '../../static/images/alert.svg'

import colors from '../../constants/colors'

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
    justifyContent: 'start',
    alignItems: 'flex-start',
  },
  imagePart: {
    textAlign: 'center'
  },
  image: {
    width: 150,
    height: 200
  },
  rating: {
    justifyContent: 'center'
  },
  textPart: {
    flex: 1,
    marginLeft: '10%',
    textAlign: 'left'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  author: {
    fontWeight: 500,
    fontSize: 13,
    color: colors.gray
  },
  textItem: {
    marginBottom: 10
  },
  textTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: '#000'
  },
  category: {
    fontWeight: 500,
    fontSize: 18,
    color: '#007efc'
  },
  tag: {
    fontSize: 13,
    paddingRight: 5,
    lineHeight: 1.5,
    color: colors.textSecondary
  },
  divider: {
    color: '#000'
  },
  numberSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberItem: {
    margin: 20
  },
  numberLabel: {
    fontWeight: 500,
    fontSize: 13,
    color: '#717171',
    textAlign: 'center'
  },
  numberContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  numberIconLeft: {
    width: 15,
    height: 'auto',
    marginRight: 5
  },
  numberIconRight: {
    width: 15,
    height: 'auto',
    marginLeft: 5
  },
  reportLink: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  reportIcon: {
    width: 15,
    height: 15
  }
}))

const BookInfo = (props) => {
  const { classes, image, rating, name, author, category, tags, number_of_bookmark, number_of_use } = props
  return (
    <div className={classes.container}>
      <Link to='/report' className={classes.reportLink}>
        <IconButton>
            <ReportIcon className={classes.reportIcon}/>
        </IconButton>
      </Link>
      <div className={classes.infoSection}>
        <div classes={classes.imagePart}>
          <img src={image} className={classes.image} alt={name}/>
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
              <span className={classes.author}>{`  do ${author}`}</span>
            </div>
          </div>
          <div className={classes.textItem}>
            <div className={classes.textTitle}>Thể loại</div>
            <Link className={classes.category} to={`/book-list/${category}`}>{category}</Link>
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
            <LikeIcon className={classes.numberIconLeft} fill='#007EFC'/>
            <span className={classes.numberWrapper}>
              <span className={classes.number} style={{ color: '#007EFC' }}>
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
              <span className={classes.number} style={{ color: colors.red }}>
                {number_of_bookmark}
              </span>
            </span>
            <HeartIcon className={classes.numberIconRight} />
          </div>
        </div>
        <div className={classes.numberItem}>
          <div className={classes.numberLabel}>Lượt mượn</div>
          <div className={classes.numberContainer}>
            <span className={classes.numberWrapper}>
              <span className={classes.number} style={{ color: '#0C4F8E' }}>
                {number_of_use}
              </span>
            </span>
            <UserIcon className={classes.numberIconRight} fill='#0C4F8E'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(BookInfo)