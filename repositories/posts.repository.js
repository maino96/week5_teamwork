const { Posts } = require('../models');

class PostRepository {
  //게시글 조회
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const allPost = await Posts.findAll();

    return allPost;
  };

  //게시글 상세조회
  findOnePost = async (postId) => {
    const postsOne = await Posts.findByPk(postId);
    return postsOne;
  };

  //게시글 작성
  createPost = async (userId, nickname, title, content) => {
    console.log('여긴 레포지토리');
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({ userId, nickname, title, content });

    return createPostData;
  };

  // 게시글 수정
  updatePost = async (postId, title, content, userId) => {
    const updatePost = Posts.update({ title, content }, { where: { postId, userId } });
    return updatePost;
  };

  // 게시글 삭제
  deletePost = async (postId, userId) => {
    const deletePost = Posts.destroy({
      where: { postId, userId },
    });
    return deletePost;
  };
}

module.exports = PostRepository;
