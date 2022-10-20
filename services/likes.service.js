const LikeRepository = require('../repositories/likes.repository');

class LikeService {
  likeRepository = new LikeRepository();

  //게시글 좋아요 조회
  mylikepost = async (userId) => {
    const mylike = await this.likeRepository.findAllPost(userId);
    const newMylike = await mylike.map((item) => {
      return {
        user: item.userId,
        postId: item.Post.postId,
        author: item.Post.User.nickname,
        title: item.Post.title,
        likesCount: item.Post.likesCount,
        createdAt: item.Post.createdAt,
        updatedAt: item.Post.updatedAt,
      };
    });
    await newMylike.sort((a, b) => b.likesCount - a.likesCount);
    return newMylike;
    // return mylike;
  };

  //게시글 좋아요
  updateLike = async (postId, userId) => {
    console.log(`postId: ${postId}, userId: ${userId}`);
    const findLike = await this.likeRepository.findLike(postId, userId);
    // console.log(`postId: ${postId}, userId: ${userId}`);
    console.log(findLike);
    if (!findLike) {
      await this.likeRepository.createLike(postId, userId);
      await this.likeRepository.increment(postId);
      return { Message: '게시글의 좋아요를 등록하였습니다.' };
    } else {
      await this.likeRepository.destroyLike(postId, userId);
      await this.likeRepository.decrement(postId);
      return { Message: '게시글의 좋아요를 취소하였습니다.' };
    }
  };
}
module.exports = LikeService;