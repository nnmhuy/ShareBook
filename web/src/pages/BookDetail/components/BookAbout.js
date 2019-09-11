import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    padding: '10px 20px',
    marginTop: 10
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center'
  },
  marker: {
    display: 'inline-block',
    width: 3,
    height: 20,
    backgroundColor: colors.primary,
    marginRight: 5
  },
  detailWrapper: {
    borderRadius: 8,
    background: '#f5f9fd',
    display: 'flex',
    flexWrap: 'wrap',
    padding: 15,
    marginTop: 15,
    marginBottom: 20
  },
  detailItem: {
    flex: 1,
    marginTop: 15
  },
  itemLabel: {
    fontSize: 14,
    color: '#696969'
  },
  itemValue: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 15,
    color: '#000'
  },
  break: {
    flexBasis: '100%',
    height: 0
  },
  overview: {
    fontSize: 14,
    lineHeight: 2,
    color: '#4e4e4e',
    marginTop: 15
  }
}))

const detailInfo = [
  { label: 'Lượt dùng', key: 'number_of_use'},
  { label: 'Volume', key: 'volume'},
  { label: 'Số trang', key: 'number_of_pages'},
  null,
  { label: 'Nhà xuất bản', key: 'publisher'},
  { label: 'Năm xuất bản', key: 'publish_year'},
  { label: 'Giá gốc', key: 'price'},
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
                    <div className={classes.itemValue}>{book[detailItem.key]}</div>
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