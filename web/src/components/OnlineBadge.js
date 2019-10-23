import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'

const OnlineBadge = withStyles(theme => ({
  badge: {
    width: 13,
    height: 13,
    background: '#09f212',
    border: '1px solid #fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
    },
  }
}))(Badge);

export default OnlineBadge