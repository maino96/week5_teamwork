// '../models'에서 가져오는 거라 이름이 Users인 것만 가져오기 위해 구조분해할당 사용
// 만약 '../models/users' 에서 require한다면 구조분해할당 해도 되고 안해도 되고...
const { Users, Posts, Comments } = require('../models');

class CommentsRepository {
  getComments = async (postId) => {
    try {
      // ORM인 Sequelize에서 Posts 모델의 findByPk 메소드를 사용해 PostId 존재 여부 확인
      const existPost = await Posts.findByPk(postId);

      if (!existPost) throw new Error('존재하지 않는 포스트입니다. ');

      // ORM인 Sequelize에서 Comments 모델의 findAll 메소드를 사용해 전체 댓글 가져오기
      const allComments = await Comments.findAll({
        where: { postId },
        include: [
          {
            model: Users,
            attributes: ['nickname'],
          },
        ],
      });
      return allComments;
    } catch (error) {
      console.error(error);
      return { errorMessage: error.message };
    }
  };

  createComment = async (postId, userId, comment) => {
    try {
      // ORM인 Sequelize에서 Posts 모델의 findByPk 메소드를 사용해 PostId 존재 여부 확인
      const existPost = await Posts.findByPk(postId);
      if (!existPost) throw new Error('존재하지 않는 포스트입니다. ');

      const newcomment = await Comments.create({
        postId,
        userId,
        comment,
      });

      // 업데이트할 때 변경 적용된 데이터 변수에 할당하도록 하는 옵션 있었는데.. 못 찾겠다.. ㅠㅠ
      // 근데 그거 create에도 되려나?
      // const newComment = await Comments.findOne({
      //   where: { commentId: comment.commentId },
      //   include: [
      //     {
      //       model: Users,
      //       attributes: ['nickname'],
      //     },
      //   ],
      // });

      return newcomment;
    } catch (error) {
      console.error(error);
      return { errorMessage: error.message };
    }
  };

  updateComment = async (commentId, userId, comment) => {
    try {
      // ORM인 Sequelize에서 Comments 모델의 findByPk 메소드를 사용해 commentId 존재 여부 확인
      const existComment = await Comments.findByPk(commentId);
      if (!existComment) throw new Error('존재하지 않는 댓글입니다.');
      // userId 일치 여부 확인
      if (existComment.userId !== userId) throw new Error('댓글 작성자만 댓글을 수정할 수 있습니다.');
      // ORM인 Sequelize에서 Comments 모델의 update 메소드를 사용해 데이터 수정 요청
      const updateComment = await Comments.update({ comment }, { where: { commentId } });
      console.log(updateComment);
      return { message: '댓글이 수정되었습니다.' };
    } catch (error) {
      console.error(error);
      return { errorMessage: error.message };
    }
  };

  deleteComment = async (commentId, userId) => {
    try {
      // ORM인 Sequelize에서 Comments 모델의 findByPk 메소드를 사용해 commentId 존재 여부 확인
      const existComment = await Comments.findByPk(commentId);
      if (!existComment) throw new Error('존재하지 않는 댓글입니다.');
      // userId 일치 여부 확인
      if (existComment.userId !== userId) throw new Error('댓글 작성자만 댓글을 삭제할 수 있습니다.');
      // ORM인 Sequelize에서 Comments 모델의 delete 메소드를 사용해 데이터 삭제 요청
      await Comments.destroy({ where: { commentId } });

      return { message: '댓글이 삭제되었습니다.' };
    } catch (error) {
      console.error(error);
      return { errorMessage: error.message };
    }
  };
}

module.exports = CommentsRepository;
