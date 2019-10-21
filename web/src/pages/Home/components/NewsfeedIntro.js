import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'

import colors from '../../../constants/colors'
import { ReactComponent as RightArrow } from '../../../static/images/right-arrow.svg'
import ReviewSlider from './ReviewSlider'

const reviewData = [
  {
    username: 'Minh Huy',
    avatar: require('../../../static/images/avatar-placeholder.png'),
    reviewId: 1,
    bookName: 'Súng, vi trùng và thép',
    reviewContent: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?'
  },
  {
    username: 'Minh Huy',
    avatar: require('../../../static/images/avatar-placeholder.png'),
    reviewId: 1,
    bookName: 'Súng, vi trùng và thép',
    reviewContent: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?'
  },
  {
    username: 'Minh Huy',
    avatar: require('../../../static/images/avatar-placeholder.png'),
    reviewId: 1,
    bookName: 'Súng, vi trùng và thép',
    reviewContent: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?'
  },
  {
    username: 'Minh Huy',
    avatar: require('../../../static/images/avatar-placeholder.png'),
    reviewId: 1,
    bookName: 'Súng, vi trùng và thép',
    reviewContent: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?'
  },
  {
    username: 'Minh Huy',
    avatar: require('../../../static/images/avatar-placeholder.png'),
    reviewId: 1,
    bookName: 'Súng, vi trùng và thép',
    reviewContent: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?'
  }
]

const styles = (theme => ({
  container: {
    width: '100%',
  },
  titleContainer: {
    position: 'relative',
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: 'bold'
  },
  link: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: '0.01em',
    color: colors.textSecondary,
    textDecoration: 'none'
  },
  loading: {
    padding: 20
  }
}))

const NewsfeedIntro = (props) => {
  const { classes, reviewLite, isLoading } = props
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>NEWSFEED</span>
        <Link to='/newsfeed' className={classes.link}>
          <RightArrow height={12} stroke={colors.textSecondary}/>
          <span> Tới newsfeed</span>
        </Link>
      </div>
      {
        isLoading ?
          <div className={classes.loading}>
            <ScaleLoader color={colors.primary} />
          </div>
          :
          <ReviewSlider reviewData={reviewLite} />
      }
    </div>
  )
}

export default withStyles(styles)(NewsfeedIntro)