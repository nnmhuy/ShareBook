import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import ReviewItem from './ReviewItem'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const demoReviewList = [
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    avatar: require('../../static/images/demo/demo_avatar.png'),
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, -1: current user dislike
    number_of_comment: 23
  },
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    avatar: require('../../static/images/demo/demo_avatar.png'),
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, 2: current user dislike
    number_of_comment: 23
  }, 
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    avatar: require('../../static/images/demo/demo_avatar.png'),
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, 2: current user dislike
    number_of_comment: 23
  }, 
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    avatar: require('../../static/images/demo/demo_avatar.png'),
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, 2: current user dislike
    number_of_comment: 23
  },
]

const ReviewList = (props) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      {
        demoReviewList.map((review, id) => {
          return (
            <ReviewItem
              key={id}
              {...review}
            />
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(ReviewList)