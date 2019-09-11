const newsDemoData = [
  { 
    title: 'Sách\n Văn học', 
    url: '/category/literature', 
    image: require('../../static/images/demo/news-placeholder.png')
  },
  {
    title: 'Sách\n Trinh thám',
    url: '/category/detective',
    image: require('../../static/images/demo/news-placeholder.png')
  },
  {
    title: 'Sách\n Tình cảm',
    url: '/category/love',
    image: require('../../static/images/demo/news-placeholder.png')
  },
]

const categoryDemoList = [
  {
    title: 'Lãng mạn',
    icon: require('../../static/images/demo/two-hearts.svg'),
    url: '/category/love',
    number_of_books: 100,
  },
  {
    title: 'Trinh thám',
    icon: require('../../static/images/demo/detective.svg'),
    url: '/category/detective',
    number_of_books: 100,
  },
  {
    title: 'Kinh dị',
    icon: require('../../static/images/demo/villian.svg'),
    url: '/category/scary',
    number_of_books: 100,
  },
  {
    title: 'Phiêu lưu',
    icon: require('../../static/images/demo/swords.svg'),
    url: '/category/adventure',
    number_of_books: 100,
  },
  {
    title: 'Lãng mạn',
    icon: require('../../static/images/demo/two-hearts.svg'),
    url: '/category/love1',
    number_of_books: 100,
  },
  {
    title: 'Trinh thám',
    icon: require('../../static/images/demo/detective.svg'),
    url: '/category/detective1',
    number_of_books: 100,
  },
  {
    title: 'Kinh dị',
    icon: require('../../static/images/demo/villian.svg'),
    url: '/category/scary1',
    number_of_books: 100,
  },
  {
    title: 'Phiêu lưu',
    icon: require('../../static/images/demo/swords.svg'),
    url: '/category/adventure1',
    number_of_books: 100,
  },
]


const demoBookList = [
  {
    id: '13',
    name: 'Netherland',
    author: 'Joseph O’Neill',
    image: require('../../static/images/demo/netherland.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '14',
    name: 'Escape Velocity',
    author: 'Geoffrey A. Moore',
    image: require('../../static/images/demo/escape_velocity.png'),
    rating: 4,
    isBookmarked: false
  },
  {
    id: '15',
    name: 'In the woods',
    author: 'Tana French',
    image: require('../../static/images/demo/in_the_woods.png'),
    rating: 1,
    isBookmarked: true
  },
  {
    id: '16',
    name: 'Netherland',
    author: 'Joseph O’Neill',
    image: require('../../static/images/demo/netherland.png'),
    rating: 4.5,
    isBookmarked: false
  },
  {
    id: '17',
    name: 'Escape Velocity',
    author: 'Geoffrey A. Moore',
    image: require('../../static/images/demo/escape_velocity.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '18',
    name: 'In the woods',
    author: 'Tana French',
    image: require('../../static/images/demo/in_the_woods.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '13',
    name: 'Netherland',
    author: 'Joseph O’Neill',
    image: require('../../static/images/demo/netherland.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '14',
    name: 'Escape Velocity',
    author: 'Geoffrey A. Moore',
    image: require('../../static/images/demo/escape_velocity.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '15',
    name: 'In the woods',
    author: 'Tana French',
    image: require('../../static/images/demo/in_the_woods.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '16',
    name: 'Netherland',
    author: 'Joseph O’Neill',
    image: require('../../static/images/demo/netherland.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '17',
    name: 'Escape Velocity',
    author: 'Geoffrey A. Moore',
    image: require('../../static/images/demo/escape_velocity.png'),
    rating: 4.5,
    isBookmarked: true
  },
  {
    id: '18',
    name: 'In the woods',
    author: 'Tana French',
    image: require('../../static/images/demo/in_the_woods.png'),
    rating: 4.5,
    isBookmarked: true
  }
]

const demoTopBooks = [
  {
    id: '13',
    name: 'Netherland',
    author: 'Joseph O’Neill',
    image: require('../../static/images/demo/netherland.png'),
    rating: 4.5,
    isBookmarked: true,
    number_of_use: 100
  },
  {
    id: '14',
    name: 'Escape Velocity',
    author: 'Geoffrey A. Moore',
    image: require('../../static/images/demo/escape_velocity.png'),
    rating: 4,
    isBookmarked: false,
    number_of_use: 100
  },
  {
    id: '15',
    name: 'In the woods',
    author: 'Tana French',
    image: require('../../static/images/demo/in_the_woods.png'),
    rating: 1,
    isBookmarked: true,
    number_of_use: 100
  },
]

export {
  newsDemoData,
  categoryDemoList,
  demoBookList,
  demoTopBooks
}