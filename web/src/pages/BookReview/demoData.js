const demoBook = {
    name: 'Animal Farm',
    image: require('../../static/images/demo/animal-farm.png')
}

const demoReview = {
    userId: '123',
    reviewId: '20',
    username: 'Minh Huy',
    images: [
        require('../../static/images/demo/animal-farm.png'),
        require('../../static/images/demo/animal-farm.png'),
        require('../../static/images/demo/animal-farm.png'),
        require('../../static/images/demo/animal-farm.png')
    ],
    avatar: require('../../static/images/demo/demo_avatar.png'),
    createdAt: '31.09.2019',
    rating: 4.5,
    title: 'Hay, thú vị',
    review: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?',
    likeStatus: 0, // 0: nothing, 1: current user liked, -1: current user dislike
    number_of_comment: 5,
    number_of_fb_like: 6,
    number_of_fb_share: 7,
    number_of_like: 15,
    number_of_dislike: 10
};

const demoCommentList = [
    {
        id: '124',
        reviewId: '20',
        userId: '123',
        username: 'Minh Huy',
        avatar: require('../../static/images/demo/demo_avatar.png'),
        likeStatus: 1, // 0: nothing, 1: current user liked, -1: current user dislike
        number_of_like: 12,
        number_of_dislike: 10,
        content: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?',
        createdAt: '31.09.2019'
    },
    {
        id: '125',
        reviewId: '20',
        userId: '123',
        username: 'Minh Huy',
        avatar: require('../../static/images/demo/demo_avatar.png'),
        likeStatus: 2, // 0: nothing, 1: current user liked, -1: current user dislike
        number_of_like: 12,
        number_of_dislike: 10,
        content: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?',
        createdAt: '31.09.2019'
    },
    {
        id: '126',
        reviewId: '20',
        userId: '123',
        username: 'Minh Huy',
        avatar: require('../../static/images/demo/demo_avatar.png'),
        likeStatus: 0, // 0: nothing, 1: current user liked, -1: current user dislike
        number_of_like: 12,
        number_of_dislike: 10,
        content: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?',
        createdAt: '31.09.2019'
    },
    {
        id: '127',
        reviewId: '20',
        userId: '123',
        username: 'Minh Huy',
        avatar: require('../../static/images/demo/demo_avatar.png'),
        likeStatus: 1, // 0: nothing, 1: current user liked, -1: current user dislike
        number_of_like: 12,
        number_of_dislike: 10,
        content: 'Thay đổi hoàn ',
        createdAt: '31.09.2019'
    },
    {
        id: '128',
        reviewId: '20',
        userId: '123',
        username: 'Minh Huy',
        avatar: require('../../static/images/demo/demo_avatar.png'),
        likeStatus: 2, // 0: nothing, 1: current user liked, -1: current user dislike
        number_of_like: 12,
        number_of_dislike: 10,
        content: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?',
        createdAt: '31.09.2019'
    }
]

export { demoBook, demoReview, demoCommentList }