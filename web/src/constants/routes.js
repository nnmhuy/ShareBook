import { ReactComponent as HomeIcon } from '../static/images/home.svg'
import { ReactComponent as BookIcon } from '../static/images/booklist.svg'
import { ReactComponent as  ReviewIcon } from '../static/images/review.svg'
import { ReactComponent as TransactionIcon } from '../static/images/transactions.svg'
import { ReactComponent as ShopIcon } from '../static/images/shop.svg'
import { ReactComponent as BookmarkIcon } from '../static/images/heart.svg'

const routes = [
  {
    label: 'Home',
    pathname: '/',
    Icon: HomeIcon
  },
  {
    label: 'Book list',
    pathname: '/book-list',
    Icon: BookIcon
  },
  {
    label: 'Review',
    pathname: '/review',
    Icon: ReviewIcon
  },
  {
    label: 'Transactions',
    pathname: '/transaction',
    Icon: TransactionIcon
  },
  {
    label: 'Shop',
    pathname: '/shop',
    Icon: ShopIcon
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