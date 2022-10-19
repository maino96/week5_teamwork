const PostService = require('../services/posts.service');


class PostsController {
  postService = new PostService(); // postService를 PostsController 클래스의 멤버 변수로 할당합니다. 
//게시글조회

  getPosts = async (req, res, next) => { // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    try {
      const allPost = await this.postService.findAllPost();
    res.status(200).json({ data: allPost }) 

} catch(error){ // catch가 에러를 받는다.
  // console.log(error)
res.status(400).send({'message': "게시글을 조회할 수 없습니다."})
}
  };
//게시글 상세조회
  getOnePosts = async (req, res, next) => {
    try {
    const postId = req.params.postId;
    const postsOne = await this.postService.findOnePost(postId);

    res.status(200).json({ data: postsOne });
  } catch(error){ // catch가 에러를 받는다.
    // console.log(error)
  res.status(400).send({'message': "게시글을 상세조회 할 수 없습니다."})
}
  };
//게시글 작성
createPost = async (req, res, next) => {
  try {
  const {userId, nickname} = res.locals.user // id값
  console.log(res.locals.user)
  const { title, content } = req.body;

  // 서비스 계층에 구현된 createPost 로직을 실행합니다.
  const createPostData = await this.postService.createPost(userId, nickname, title, content);
  res.status(201).json({ data: createPostData });
} catch(error){ // catch가 에러를 받는다.
  // console.log(error)
res.status(400).send({'message': "게시글을 작성할 수 없습니다."})
}
  };

// 게시판 PUT
  updatePost = async (req, res, next) => {
    try {
    const { title, content } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals.user;
    //console.log(userId)

    await this.postService.updatePost(postId, title, content, userId);
    res.status(200).send('게시글이 수정되었습니다');
  } catch(error){ // catch가 에러를 받는다.
    // console.log(error)
  res.status(400).send({'message': "게시글을 수정할 수 없습니다."})
  }
    };

// 게시판 DELETE
deletePost = async (req, res, next) => {
  try {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  await this.postService.deletePost(postId, userId);
  res.status(200).send('게시글이 삭제되었습니다');
} catch(error){ // catch가 에러를 받는다.
  // console.log(error)
res.status(400).send({'message': "게시글을 삭제할 수 없습니다."})
}
  };
}


module.exports = PostsController;
