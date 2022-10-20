const LikeService = require('../services/likes.service');

class LikesController {
  likeService = new LikeService(); // likeService를 LikesController 클래스의 멤버 변수로 할당합니다.

  //게시글 좋아요 조회
  getLikePosts = async (req, res, next) => {
    const { userId } = res.locals.user;
    const mylikepost = await this.likeService.mylikepost(userId);

    res.status(200).json({ data: mylikepost });
  };

  //게시글 좋아요
  updateLike = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    console.log(`postId: ${postId}, userId: ${userId}`);
    const updateLike = await this.likeService.updateLike(postId, userId);
    // const mylikepostId

    res.status(201).json(updateLike);
  };
}

module.exports = LikesController;