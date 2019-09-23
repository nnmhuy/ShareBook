import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Avatar } from '@material-ui/core'

import Link from '../../../components/Link'

import colors from '../../../constants/colors'
import { ReactComponent as DownIcon } from '../../../static/images/right-arrow.svg'

const styles = (theme => ({
  container: {
    marginBottom: 20,
    textAlign: 'center',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  availableDot: {
    display: 'inline-block',
    background: colors.green,
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginRight: 10
  },
  unavailableDot: {
    display: 'inline-block',
    background: colors.red,
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginRight: 10
  },
  titleText: {
    fontWeight: 600,
    fontSize: 13,
    lineHeight: 2,
    color: colors.primary,
    marginRight: 15
  },
  borrowButton: {
    borderRadius: 6,
    background: 'linear-gradient(to right, #0076ff 0%, #04abe8 100%)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    color: '#fff',
    textTransform: 'none',
    width: 82,
    height: 24,
    fontWeight: 600,
    fontSize: 11,
  },
  marker: {
    display: 'inline-block',
    width: 2,
    height: 15,
    backgroundColor: colors.primary,
    marginRight: 5
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 2,
    fontWeight: 500,
    fontSize: 12,
  },
  infoWrapper: {
    marginTop: 5,
    display: 'flex',
    alignItems: 'center'
  },
  userWrapper: {
    marginTop: 10
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 10
  },
  dot: {
    display: 'inline-block',
    width: 4,
    height: 4,
    background: colors.primary,
    borderRadius: '50%',
    marginRight: 5
  },
  nameLabel: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 2,
    color: '#696969',
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    fontSize: 13,
    lineHeight: 2,
    color: colors.primary,
    fontWeight: 500
  },
  userIcon: {
    height: 11,
    width: 'auto'
  },
  downIcon: {
    height: 8,
    width: 'auto',
    transform: 'rotate(90deg)'
  },
  upIcon: {
    height: 8,
    width: 'auto',
    transform: 'rotate(-90deg)'
  },
  expandButton: {
    marginTop: 10,
    borderRadius: 6,
    background: 'linear-gradient(to right, #0076ff 0%, #04abe8 100%)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    color: '#fff',
    fontWeight: ' normal',
    textTransform: 'none'
  },
  detailWrapper: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  break: {
    flexBasis: '100%',
    height: 0
  },
  hideDetail: {
    display: 'none',
    transition: '2s'
  },
  detailContainer: {
    flex: 1,
    textAlign: 'left',
    marginTop: 15
  },
  detailLabelContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 600,
    fontSize: 12,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.primary,
    marginTop: 5,
    marginLeft: 8
  },
  note: {
    marginTop: 10,
    borderRadius: 8,
    background: '#f5f9fd',
    fontSize: 13,
    padding: 10
  }
}))

const keyArray = [
  { 
    label: 'Trạng thái',
    key: 'isAvailable',
    mapValue: (value) => {
      return value ? 'Đang có' : 'Đang được mượn'
    },
    style: (value) => {
      if (value) {
        return { color: colors.green }
      }
      else {
        return { color: colors.red }
      }
    }
  },
  {
    label: 'Tình trạng sách',
    key: 'bookCondition',
    mapValue: (value) => {
      switch (value) {
        case 'new':
          return 'Mới'
        case 'normal':
          return 'Bình thường'
        case 'old':
          return 'Cũ'
        default:
          return '?'
      }
    }
  },
  {
    key: 'break'
  },
  {
    label: 'Thời gian mượn',
    key: 'estimatedReadingTime',
    mapValue: (value) => {
      return `${value} ngày`
    }
  },
  {
    label: 'Phương thức trả',
    key: 'type',
    mapValue: (value) => {
      switch (value) {
        case 0:
          return 'Trả lại'
        case 1:
          return 'Lan truyền'
        default:
          return '?'
      }
    }
  }
]

const BookInstance = (props) => {
  const { classes, isAvailable, index, 
    ownerId, ownerUsername, ownerAvatar,
    holderId, holderUsername, holderAvatar,
  } = props

  const [isExpanded, setExpanded] = React.useState(false)
  
  const handleToggleExpand = () => {
    setExpanded(!isExpanded)
  }

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <span className={isAvailable ? classes.availableDot : classes.unavailableDot}/>
        <span className={classes.titleText}>{`Cuốn ${index + 1}`}</span>
        <Button disabled={!isAvailable} className={classes.borrowButton} variant='contained' size='small'>Mượn sách</Button>
      </div>
      <div className={classes.userWrapper}>
        <div className={classes.label}>
          <span className={classes.marker}></span>
          Thông tin chủ sách
        </div>
        <div className={classes.infoWrapper}>
          <Link to={`/profile/${ownerId}`}>
            <Avatar src={ownerAvatar} className={classes.avatar}/>
          </Link>
          <div>
            <div className={classes.nameLabel}>
              <span className={classes.dot}/>
              Họ tên
            </div>
            <Link className={classes.username} to={`/profile/${ownerId}`}>{ownerUsername}</Link>
          </div>
        </div>
      </div>
      <div className={classes.userWrapper}>
        <div className={classes.labelWrapper}>
          <div className={classes.label}>
            <span className={classes.marker}></span>
            Thông tin người giữ sách 
          </div>
        </div>
        <div className={classes.infoWrapper}>
          <Link to={`/profile/${holderId}`}>
            <Avatar src={holderAvatar} className={classes.avatar} />
          </Link>
          <div>
            <div className={classes.nameLabel}>
              <span className={classes.dot} />
              Họ tên
            </div>
            <Link className={classes.username} to={`/profile/${holderId}`}>{holderUsername}</Link>
          </div>
        </div>
      </div>
      <div className={`${classes.detailWrapper} ${!isExpanded && classes.hideDetail}` }>
        {
          keyArray.map((key, index) => {
            if (key.key === 'break') {
              return <div className={classes.break} key={`break-${index}`}></div>
            }
            const value = props[key.key]
            return (
              <div key={key.key} className={classes.detailContainer}>
                <div className={classes.detailLabelContainer}>
                  <span className={classes.marker}/>
                  <span className={classes.detailLabel}>{key.label}</span>
                </div>
                <div style={key.style && key.style(value)} className={classes.detailValue}>
                  {key.mapValue(value)}
                </div>
              </div>
            )
          })
        }
        <div className={classes.break} key={`break-${index}`}></div>
        <div className={classes.detailContainer}>
          <div className={classes.detailLabelContainer}>
            <span className={classes.marker} />
            <span className={classes.detailLabel}>Ghi chú</span>
          </div>
          <div className={classes.note}>
            {
              props.note
            }
          </div>
        </div>
      </div>
      <Button className={classes.expandButton} variant='contained' size='small' onClick={handleToggleExpand}>
        <DownIcon className={isExpanded ? classes.upIcon : classes.downIcon} stroke='#fff'/>
      </Button>
    </div>
  )
}

export default withStyles(styles)(BookInstance)