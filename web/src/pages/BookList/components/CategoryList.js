import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Link from '../../../components/Link'
import Carousel from 'nuka-carousel'

import CategoryItem from './CategoryItem'

const styles = (theme => ({
  container: {
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewMore: {
    fontSize: 11,
    color: '#0274df'
  },
  carousel: {
    paddingLeft: 20,
    marginTop: 16
  }
}))

const CategoryList = (props) => {
  const { classes, categoryList } = props
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>Thể loại</span>
        <Link to='/category-list' className={classes.viewMore}>Xem thêm</Link>
      </div>
      <Carousel 
        slideWidth='142px'
        cellSpacing={20}
        withoutControls
        slidesToScroll='auto'
        className={classes.carousel}
      >
        {
          categoryList.map(category => {
            return (
              <CategoryItem
                {...category}
                key={category.url}
              />
            )
          })
        }
      </Carousel>
    </div> 
  )
}

export default withStyles(styles)(CategoryList)