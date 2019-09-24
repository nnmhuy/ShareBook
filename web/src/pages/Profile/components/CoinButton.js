import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
	button: {
		fontFamily: 'Montserrat',
		fontWeight: 700,
		fontSize: 12,
		color: 'white',
		padding: '5px 25px',
		marginRight: 10,
		marginBottom: 5
	}
})

class CoinButton extends Component {
	render() {
		const { classes, title, bgCoin } = this.props;
		let path = '';
		switch (this.props.title) {
			case 'cho mượn': path = '/create-book'; break;
			case 'ghi review': path = '/book-list'; break;
			default: path = '/'; break;
		}

		return (
			<Link style={{ textDecoration: 'none' }} to={path}>
				<Button className={classes.button}
					style={{ background: `url(${bgCoin}) center center no-repeat` }}
				>
					{title}
				</Button>
			</Link>
		);
	}
}

export default connect()(withStyles(styles)(CoinButton));