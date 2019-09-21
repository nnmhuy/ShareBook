import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({

})

class AboutTerms extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => { return {} }

export default connect(mapStateToProps)(withStyles(styles)(AboutTerms));