'use strict';

const BACKEND_URL = process.env.BACKEND_URL;

var categoryList = [
  {
    name: 'Văn học',
    url: '/literature',
    id: 1,
  },
  {
    name: 'Thiếu nhi',
    url: '/children-book',
    id: 2,
  },
  {
    name: 'Tiểu sử - hồi ký',
    url: '/biographies-and-memoirs',
    id: 3,
  },
  {
    name: 'Kinh tế',
    url: '/business-and-investing',
    id: 4,
  },
  {
    name: 'Tâm lý - kỹ năng',
    url: '/self-help',
    id: 5,
  },
  {
    name: 'Sách giáo khoa',
    url: '/study-book',
    id: 6,
  },
  {
    name: 'Truyện tranh',
    url: '/comic',
    id: 7,
  },
  {
    name: 'Khoa học kỹ thuật',
    url: '/natural-science-and-technology',
    id: 8,
  },
  {
    name: 'Khoa học xã hội',
    url: '/social-science',
    id: 9,
  },
  {
    name: 'Sách học ngoại ngữ',
    url: '/foreign-language',
    id: 10,
  },
  {
    name: 'Du lịch - trải nghiệm',
    url: '/travel-and-cook',
    id: 11,
  },
  {
    name: 'Nghệ thuật',
    url: '/movie-music-art',
    id: 12,
  },
  {
    name: 'Sở thích - trò chơi',
    url: '/hobby-game',
    id: 13,
  },
  {
    // when create book use constant 14
    name: 'Chưa xác định',
    url: '/unknown',
    id: 14,
  },
];

const fullCategoryList = categoryList.map(element => {
  element.image = '/containers/defaultContainer/download' +
  element.url + '.svg';
  element.url = '/category' + element.url;
  return element;
});

module.exports = fullCategoryList;
