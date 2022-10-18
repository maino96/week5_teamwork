const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService(); // Comments 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getComments = async (req, res) => {
    try {
      const { postId } = req.params;
      if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');
      // 서비스 계층에 구현된 getComments 로직을 실행합니다.
      const allComments = await this.commentsService.getComments(postId);

      if (allComments.errorMessage) throw new Error(allComments.errorMessage);

      return res.status(200).send(allComments);
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({ errorMessage: error.message });
    }
  };

  createComment = async (req, res) => {
    try {
      const { postId } = req.params;
      if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');
      const { comment } = req.body;
      if (!comment || comment.search(/\s/) === comment.length) throw new Error('댓글을 입력해주세요.');

      // 서비스 계층에 구현된 getComments 로직을 실행합니다.
      const { user } = res.locals;
      const newComment = await this.commentsService.createComment(postId, user.userId, comment);

      if (newComment.errorMessage) throw new Error(newComment.errorMessage);

      return res.status(200).send(newComment);
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({ errorMessage: error.message });
    }
  };

  updateComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      // 유효성 검증은 더 추가해야 할 것 같다. 근데 이건 일단 분리한 다음에..
      if (typeof (commentId / 1) === NaN || commentId.search(/\s/) != -1) throw new Error('commentId를 잘못 입력하였습니다.');
      const { comment } = req.body;
      if (!comment || comment.search(/\s/) === comment.length) throw new Error('댓글을 입력해주세요.');

      // 서비스 계층에 구현된 getComments 로직을 실행합니다.
      const { user } = res.locals;
      const updateResult = await this.commentsService.updateComment(commentId, user.userId, comment);

      if (updateResult.message) res.status(200).send(updateResult);
      else res.status(400).send(updateResult);
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({ errorMessage: error.message });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      // 유효성 검증은 더 추가해야 할 것 같다. 근데 이건 일단 분리한 다음에..
      if (typeof (commentId / 1) === NaN || commentId.search(/\s/) != -1) throw new Error('commentId를 잘못 입력하였습니다.');

      // 서비스 계층에 구현된 getComments 로직을 실행합니다.
      const { user } = res.locals;
      const deleteResult = await this.commentsService.deleteComment(commentId, user.userId);

      if (deleteResult.message) res.status(200).send(deleteResult);
      else res.status(400).send(deleteResult);
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({ errorMessage: error.message });
    }
  };
}

module.exports = CommentsController;
