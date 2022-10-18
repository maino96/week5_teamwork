const LoginRepository = require('../repositories/login.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class LoginService {
  loginRepository = new LoginRepository();

  findUser = async (nickname, password) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const user = await this.loginRepository.findUser(nickname, password);
    if (!user) return;

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.

    // 유저가 있으니 토큰 만들어서 전달
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
      // 토큰 만료시간 1시간으로 설정. 테스트를 위해.. (나중에 줄여줄 것!)
      expiresIn: '1h',
    });

    return { token };
  };
}

module.exports = LoginService;
