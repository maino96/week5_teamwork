const PostRepository = require('../repositories/posts.repository'); 

class PostService {
  postRepository = new PostRepository();

  //게시글전체조회
  findAllPost = async () => { 
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map(post => { 
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }
    });
  }

    //게시글상세조회
    findOnePost = async (postId) => { 
        // 저장소(Repository)에게 데이터를 요청합니다.
       
        const postsOne = await this.postRepository.findOnePost(postId);
    
        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
          return {
            postId: postsOne.postId,
            nickname: postsOne.nickname,
            title: postsOne.title,
            content: postsOne.content,
            createdAt: postsOne.createdAt,
            updatedAt: postsOne.updatedAt
          }
    
      }
    
  //게시글작성
  createPost = async ( userId, nickname, title, content, like) => { 
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost( userId, nickname, title, content, like);


    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createPostData.postId,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  }

  updatePost = async (postId, title, content, userId) => {
    // 게시글 PUT
    console.log(postId, title, content, userId);
    try {
      await this.postRepository.updatePost(postId, title, content, userId);
      return {
        postId: updatePost.postId,
        title: updatePost.title,
        content: updatePost.content,
        userId: updatePost.userId,
      };
    } catch (e) {
      return {
        message: '게시글 수정에 실패했습니다',
        status: 400,
      };
    }
  };

  deletePost = async (postId, userId) => {
    // 게시글 DELETE
    try {
      const deletePost = await this.postRepository.deletePost(postId, userId);
      return {
        postId: deletePost.postId,
      };
    } catch (e) {
      return {
        message: '게시글 삭제에 실패했습니다',
        status: 400,
      };
    }
  };

}


module.exports = PostService;

