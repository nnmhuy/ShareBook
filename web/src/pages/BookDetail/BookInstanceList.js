import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import BookInstance from './BookInstance'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const demoBookInstance = [
  {
    isAvailable: true,
    ownerId: '000',
    ownerUsername: 'Trịnh Hữu Đức',
    ownerAvatar: require('../../static/images/demo/demo_avatar_1.png'),

    holderId: '001',
    holderUsername: 'Nguyễn Ngọc Minh Huy',
    holderAvatar: require('../../static/images/demo/demo_avatar.png'),

    number_of_use: 1,
    bookCondition: 0,
    deposit_coin: 30,
    estimated_reading_time: 20,
    type: 0
  },
  {
    isAvailable: true,
    ownerId: '000',
    ownerUsername: 'Trịnh Hữu Đức',
    ownerAvatar: require('../../static/images/demo/demo_avatar_1.png'),

    holderId: '001',
    holderUsername: 'Nguyễn Ngọc Minh Huy',
    holderAvatar: require('../../static/images/demo/demo_avatar.png'),

    number_of_use: 1,
    bookCondition: 1,
    deposit_coin: 30,
    estimated_reading_time: 20,
    type: 1
  },
  {
    isAvailable: false,
    ownerId: '000',
    ownerUsername: 'Trịnh Hữu Đức',
    ownerAvatar: require('../../static/images/demo/demo_avatar_1.png'),

    holderId: '001',
    holderUsername: 'Nguyễn Ngọc Minh Huy',
    holderAvatar: require('../../static/images/demo/demo_avatar.png'),

    number_of_use: 1,
    bookCondition: 2,
    deposit_coin: 30,
    estimated_reading_time: 20,
    type: 1
  },
]

const BookInstanceList = (props) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      {
        demoBookInstance.map((instance, index) => {
          return (
            <BookInstance {...instance}  index={index} key={index}/>
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(BookInstanceList)