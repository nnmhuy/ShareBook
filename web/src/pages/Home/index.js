import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = (theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}))

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1>ShareBook.org.vn</h1>
        <div>
          <Link to={'/counter'}>
            <Button variant="outlined" className={classes.button}>
              Counter
            </Button>
          </Link>
          <Button variant="outlined" color="primary" className={classes.button}>
            Primary
          </Button>
          <Button variant="outlined" color="secondary" className={classes.button}>
            Secondary
          </Button>
          <Button variant="outlined" disabled className={classes.button}>
            Disabled
          </Button>
          <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
            Link
          </Button>
          <input
            accept="image/*"
            className={classes.input}
            id="outlined-button-file"
            multiple
            type="file"
          />
          <label htmlFor="outlined-button-file">
            <Button variant="outlined" component="span" className={classes.button}>
                Upload
            </Button>
          </label>
          <Button variant="outlined" color="inherit" className={classes.button}>
            Inherit
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ state }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
