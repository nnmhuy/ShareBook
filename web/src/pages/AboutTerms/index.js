import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import LayoutWrapper from '../../components/LayoutWrapper';

const styles = theme => ({
	container: {
		width: '100%',
		minWidth: 350,
		maxWidth: 800,
		margin: 'auto'
	},
	headline: {
		fontWeight: 600
	},
})

const usage = 'Mục đích và phạm vi thu thập'
const usagePara = 'Việc thu thập dữ liệu chủ yếu trên ShareBook.com.vn bao gồm: email, số điện thoại, tên đăng nhập, mật khẩu đăng nhập. Đây là các thông tin mà ShareBook cần người dung cung cấp bắt buộc khi đăng kí sử dụng website và ShareBook sử dụng nhằm liên hệ trong giao dịch với người dùng đăng kí sử dụng website trên ShareBook.com.vn, đảm bảo quyền lợi cho người dùng. \n \n Các người dùng sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng website dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình. Ngoài ra, người dùng có trách nhiệm thông báo kịp thời cho ShareBook.com.vn về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.'
const range = 'Phạm vi sử dụng thông tin'
const rangeHead = 'Website ShareBook.com.vn sử dụng thông tin người dùng cung cấp để'
const ranges = [
	'Gửi thông báo về các hoạt động trao đổi, giao dịch sách giữa các người dùng.',
	'Những người dùng khác có thể xem thông tin về tên, số điện thoại, tài khoản email của người dùng trên website nhằm phục vụ mục đích trao đổi, giao dịch sách.',
	'Ngăn ngừa các hoạt động phá hủy tài khoản của người dùng hoặc các hoạt động giả mạo người dùng.',
	'Liên lạc và giải quyết với khách hàng trong những trường hợp đặc biệt.',
	'Không sử dụng thông tin cá nhân của người dùng ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại ShareBook.com.vn.',
	'Website ShareBook.com.vn có trách nhiệm hợp tác cung cấp thông tin cá nhân người dùng khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.'
]
const storing = 'Thời gian lưu trữ thông tin'
const storingPara = 'Dữ liệu cá nhân của người dùng sẽ được lưu trẽ cho đến khi có yêu cầu hủy bỏ hoặc tự người dùng đăng nhập và thực hiện hủy bỏ. Còn laij trong mọi trường hợp, thông tin cá nhân khách hàng sẽ được bảo mật trên máy chủ của ShareBook.com.vn.'
const address = 'Địa chỉ của đơn vị thu thâp, quản lý thông tin và hỗ trợ người dùng'
const addresses = [
	'Văn phòng VietSeeds Foudation: 101/24 Đường Đinh Bộ Lĩnh, Phường 26, Quận Bình Thạnh, Thành Phố Hồ Chí Minh.',
	'Hotline: 0385899348',
	'Email: sharebook.com.vn@gmail.com'
]


class AboutTerms extends Component {
	render() {
		const { classes, account } = this.props;
		return (
			<LayoutWrapper account={account} title='Chính sách bảo mật'>
				<div className={classes.container}>
					<div>
						<h4 className={classes.headline}>1. {usage}</h4>
						<p>
							{usagePara}
						</p>
					</div>
					<div>
						<h4 className={classes.headline}>2. {range}</h4>
						<p>{rangeHead}</p>
						<ul>
							{
								ranges.map(item => <li>{item}</li>)
							}
						</ul>
					</div>
					<div>
						<h4 className={classes.headline}>3. {storing}</h4>
						<p>{storingPara}</p>
					</div>
					<div>
						<h4 className={classes.headline}>4. {address}</h4>
						<p>{storingPara}</p>
						<ul>
							{
								addresses.map(item => <li>{item}</li>)
							}
						</ul>
					</div>
				</div>
			</LayoutWrapper>
		);
	}
}

const mapStateToProps = ({ state }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    }
  }
}

export default connect(mapStateToProps)(withStyles(styles)(AboutTerms));