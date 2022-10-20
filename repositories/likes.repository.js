const { Likes, Posts, Users } = require('../models');

class LikeRepository {
  //게시글 좋아요 조회
  findAllPost = async (userId) => {
    const mylike = await Likes.findAll({
      where: { userId },
      include: [
        {
          model: Posts,
          include: [{ model: Users }],
        },
      ],
    });

    return mylike;
  };
  mylikepost = async () => {
    await Posts.findAll({ where: { postId }, order: [['likesCount', 'DESC']] });
  };

  //게시글 좋아요

  findLike = async (postId, userId) => {
    const likefind = await Likes.findOne({ where: { postId, userId } });
    console.log(likefind);
    return likefind;
  };
  createLike = async (postId, userId) => {
    await Likes.create({ userId: userId, postId: postId });
  };
  destroyLike = async (postId, userId) => {
    await Likes.destroy({ where: { postId: postId, userId: userId } });
  };
  increment = async (postId) => {
    await Posts.increment({ likesCount: 1 }, { where: { postId: postId } });
  };
  decrement = async (postId) => {
    await Posts.decrement({ likesCount: 1 }, { where: { postId: postId } });
  };
}

module.exports = LikeRepository;