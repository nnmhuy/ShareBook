const demoBook = {
  name: 'Animal Farm',
  image: require('../../static/images/demo/animal-farm.png'),
  author: 'George Orwell',
  category: 'Law',
  tags: [
    'kịch tính',
    'châm biếm',
    'tâm lý',
    'kịch tính',
    'châm biếm'
  ],
  isLike: false,
  rating: 4.5,
  numberOfBookmarks: 60,
  number_of_use: 50,

  volume: 2,
  publisher: 'Penguin',
  publish_year: 2015,
  description: 'A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality.\n Thus the stage is set for one of the most telling satiric fables ever penned a razor- edged fairy tale for grown - ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible.',
  price: 100000,
  number_of_pages: 300
}

const demoReviewList = [
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    avatar: require('../../static/images/demo/demo_avatar.png'),
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, -1: current user dislike
    number_of_comment: 23
  },
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    avatar: require('../../static/images/demo/demo_avatar.png'),
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, 2: current user dislike
    number_of_comment: 23
  },
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    avatar: require('../../static/images/demo/demo_avatar.png'),
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, 2: current user dislike
    number_of_comment: 23
  },
  {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    avatar: require('../../static/images/demo/demo_avatar.png'),
    images: [
      require('../../static/images/demo/animal-farm.png')
    ],
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: '“Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?”',
    likeStatus: 1, // 0: nothing, 1: current user liked, 2: current user dislike
    number_of_comment: 23
  },
]

const demoBookInstance = [
  {
    isAvailable: true,
    ownerId: '000',
    ownerUsername: 'Trịnh Hữu Đức',
    ownerAvatar: require('../../static/images/demo/demo_avatar_1.png'),

    holderId: '001',
    holderUsername: 'Nguyễn Ngọc Minh Huy',
    holderAvatar: require('../../static/images/demo/demo_avatar.png'),

    number_of_use: 1,
    bookCondition: 0,
    deposit_coin: 30,
    estimated_reading_time: 20,
    type: 0
  },
  {
    isAvailable: true,
    ownerId: '000',
    ownerUsername: 'Trịnh Hữu Đức',
    ownerAvatar: require('../../static/images/demo/demo_avatar_1.png'),

    holderId: '001',
    holderUsername: 'Nguyễn Ngọc Minh Huy',
    holderAvatar: require('../../static/images/demo/demo_avatar.png'),

    number_of_use: 1,
    bookCondition: 1,
    deposit_coin: 30,
    estimated_reading_time: 20,
    type: 1
  },
  {
    isAvailable: false,
    ownerId: '000',
    ownerUsername: 'Trịnh Hữu Đức',
    ownerAvatar: require('../../static/images/demo/demo_avatar_1.png'),

    holderId: '001',
    holderUsername: 'Nguyễn Ngọc Minh Huy',
    holderAvatar: require('../../static/images/demo/demo_avatar.png'),

    number_of_use: 1,
    bookCondition: 2,
    deposit_coin: 30,
    estimated_reading_time: 20,
    type: 1
  },
]

const demoSimilarBooks = [
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

export {
  demoBook,
  demoReviewList,
  demoBookInstance,
  demoSimilarBooks
}