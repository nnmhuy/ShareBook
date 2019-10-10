import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    padding: '10px 20px',
    marginTop: 10
  },
  label: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 2,
    display: 'flex',
    alignItems: 'center'
  },
  marker: {
    display: 'inline-block',
    width: 2,
    height: 15,
    backgroundColor: colors.primary,
    marginRight: 5
  },
  detailWrapper: {
    borderRadius: 8,
    background: '#f5f9fd',
    display: 'flex',
    flexWrap: 'wrap',
    padding: 15,
    marginTop: 10,
    marginBottom: 20
  },
  detailItem: {
    flex: 1,
    marginTop: 15
  },
  itemLabel: {
    fontSize: 12,
    color: '#696969',
    fontWeight: 500,
    lineHeight: 2,
  },
  itemValue: {
    fontSize: 13,
    color: '#000',
    fontWeight: 500,
    lineHeight: 2,
  },
  break: {
    flexBasis: '100%',
    height: 0
  },
  overview: {
    lineHeight: 2,
    color: '#4e4e4e',
    marginTop: 10,
    fontWeight: 500,
    fontSize: 12
  }
}))

const detailInfo = [
  { label: 'Lượt dùng', key: 'numberOfUse'},
  { label: 'Tập', key: 'volume'},
  { label: 'Số trang', key: 'numberOfPages'},
  null,
  { label: 'Nhà xuất bản', key: 'publisher'},
  { label: 'Năm xuất bản', key: 'publishYear'},
  { label: 'Giá bìa', key: 'price'},
]

const BookAbout = (props) => {
  const { classes, book } = props
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.label}>
          <span className={classes.marker}></span>
          Chi tiết sách
        </div>
        <div className={classes.detailWrapper}>
          {
            detailInfo.map(detailItem => {
              return (
                detailItem ?
                  <div key={detailItem.key} className={classes.detailItem}>
                    <div className={classes.itemLabel}>{detailItem.label}</div>
                    <div className={classes.itemValue}>
                      { detailItem.key === 'volume' && (book[detailItem.key] === -1 || !book[detailItem.key])
                      ? 'Sách lẻ'
                      : book[detailItem.key]}
                    </div>
                  </div>
                  :
                  <div className={classes.break} key='break'></div>
              )
            })
          }
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.label}>
          <span className={classes.marker}></span>
          Giới thiệu
        </div>
        <div className={classes.overview}>
          {book.description}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(BookAbout)