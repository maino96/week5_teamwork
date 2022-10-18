const LoginService = require('../services/login.service');
const Joi = require('joi');

const loginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

class LoginController {
  loginService = new LoginService(); // Login 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  login = async (req, res) => {
    try {
      // 닉네임, 패스워드 loginSchema로 유효성 검사해서 오류 발생시 try catch 문에 의해 400으로 에러 메세지 응답
      const { nickname, password } = await loginSchema.validateAsync(req.body);

      // 서비스 계층에 구현된 login 로직을 실행합니다.
      const loginResult = await this.loginService.findUser(nickname, password);

      if (!loginResult) {
        return res.status(412).send({
          errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
      }
      // if문 통과했다면 db 에 존재하는 유저 => 쿠키와 토큰 만료시간 설정해서 생성한 뒤 response 전달

      return res.status(200).send(loginResult);
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  };
}

module.exports = LoginController;
