const CommentsRepository = require('../repositories/comments.repository');
const _ = require('lodash');

class CommentsService {
  commentsRepository = new CommentsRepository();

  getComments = async (postId) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allComments = await this.commentsRepository.getComments(postId);

    /*
    repository에서 잘못된 postId 일경우 에러를 리턴하는데 에러를 정렬하려고 하거나 map으로 가공하려고 하면 
    또 에러가 발생할 것 같아서 에러가 있다면 그냥 에러를 리턴하도록 에러여부 필터링 함.
    */
    if (allComments.errorMessage) {
      return { errorMessage: allComments.errorMessage };
    }

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    allComments.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // _.flatten(allComments, true);
    // 이게 undefined네... allComments.User도 마찬가지..
    console.log(allComments.Users);
    allComments.map((comment) => {
      return {
        commentId: allComments.commentId,
        postId: allComments.postId,
        // 모델 이름을 다 Users로 해줬는데 왜 여긴 User일까...?
        // nickname 어떻게 가져와야 하지..?
        // nickname: allComments.User.dataValues.nickname,
        comment: allComments.comment,
        createdAt: allComments.createdAt,
        updatedAt: allComments.updatedAt,
      };
    });

    return allComments;
  };

  createComment = async (postId, userId, comment) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const newComment = await this.commentsRepository.createComment(postId, userId, comment);

    if (newComment.errorMessage) {
      return { errorMessage: newComment.errorMessage };
    }

    return newComment;
  };

  updateComment = async (commentId, userId, comment) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const updateResult = await this.commentsRepository.updateComment(commentId, userId, comment);

    return updateResult;
  };

  deleteComment = async (commentId, userId) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const deleteResult = await this.commentsRepository.deleteComment(commentId, userId);

    return deleteResult;
  };
}

module.exports = CommentsService;
