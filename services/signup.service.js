const SignupRepository = require('../repositories/signup.repository');

class SignupService {
  signupRepository = new SignupRepository();

  signupMember = async (nickname, password) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const signupMember = await this.signupRepository.signupMember(nickname, password);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    // 유저 정보를 다시 돌려줄 필요는 없고... 중복 확인 후 중복 메세지 혹은 회원가입 성공 메세지 전달 정도려나..?
    return signupMember;
  };
}

module.exports = SignupService;
