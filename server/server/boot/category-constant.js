'use strict';

const BACKEND_URL = process.env.BACKEND_URL;

var categoryList = [
  {
    name: 'Văn học',
    url: '/literature',
  },
  {
    name: 'Thiếu nhi',
    url: '/children-book',
  },
  {
    name: 'Tiểu sử - hồi ký',
    url: '/biographies-and-memoirs',
  },
  {
    name: 'Kinh tế',
    url: '/business-and-investing',
  },
  {
    name: 'Tâm lý - kỹ năng',
    url: '/self-help',
  },
  {
    name: 'Sách giáo khoa',
    url: '/study-book',
  },
  {
    name: 'truyện tranh',
    url: '/comic',
  },
  {
    name: 'Khoa học kỹ thuật',
    url: '/natural-science-and-technology',
  },
  {
    name: 'Khoa học xã hội',
    url: '/social-science',
  },
  {
    name: 'Sách học ngoại ngữ',
    url: '/foreign-language',
  },
  {
    name: 'Du lịch - trải nghiệm',
    url: '/travel-and-cook',
  },
  {
    name: 'Nghệ thuật',
    url: '/movie-music-art',
  },
  {
    name: 'Sở thích - trò chơi',
    url: '/hobby-game',
  },
];

const fullCategoryList = categoryList.map(element => {
  element.image = BACKEND_URL + '/containers/defaultContainer/download' +
  element.url + '.svg';
  element.url = '/category' + element.url;
  return element;
});

module.exports = fullCategoryList;
