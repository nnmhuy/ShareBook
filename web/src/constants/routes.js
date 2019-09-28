import { ReactComponent as HomeIcon } from '../static/images/home.svg'
import { ReactComponent as BookIcon } from '../static/images/booklist.svg'
import { ReactComponent as ReviewIcon } from '../static/images/review.svg'
import { ReactComponent as TransactionIcon } from '../static/images/transactions.svg'
import { ReactComponent as BookAddIcon } from '../static/images/book-add.svg'
import { ReactComponent as BookmarkIcon } from '../static/images/bookmark-sidebar.svg'

const routes = [
  {
    label: 'Trang chủ',
    pathname: '/',
    Icon: HomeIcon
  },
  {
    label: 'Kệ sách',
    pathname: '/book-list',
    Icon: BookIcon
  },
  {
    label: 'Newsfeed',
    pathname: '/review',
    Icon: ReviewIcon
  },
  {
    label: 'Giao dịch',
    pathname: '/transaction',
    Icon: TransactionIcon
  },
  {
    label: 'Thêm sách',
    pathname: '/create-book',
    Icon: BookAddIcon
  },
  {
    label: 'Bookmarks',
    pathname: '/profile/bookmarks',
    Icon: BookmarkIcon
  },
]

const infoRoutes = [
  {
    label: 'About us',
    pathname: '/about'
  },
  {
    label: 'Contact us',
    pathname: '/contact'
  },
  {
    label: 'Terms & Privacy policy',
    pathname: '/policy'
  },
]

const otherRoutes = [
  {
    label: 'Report',
    pathname: '/report'
  },
  {
    label: 'Account',
    pathname: '/account'
  }
]

export {
  routes,
  infoRoutes,
  otherRoutes
}