const SignupService = require('../services/signup.service');
const Joi = require('joi');

// Signup의 컨트롤러(Controller)역할을 하는 클래스
// 클라이언트의 요청(Request)을 서비스 계층으로 데이터를 전달
// 서비스 계층에서 어떠한 내부 구조를 통해 비즈니스 로직을 수행하는 것인지 상위 계층인 컨트롤러에게는 중요하지 않음
class SignupController {
  signupService = new SignupService(); // Signup 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  signupMember = async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;
    // 유효성 검사... 음...이건 미들웨어로 뺴는게 낫나...? 아님 서비스에서? 아님...?
    if (password !== confirmPassword) {
      return res.status(400).send({
        errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
      });
    }
    if (password.includes(nickname)) {
      return res.status(400).send({
        errorMessage: '패스워드에 닉네임이 포함될 수 없습니다.',
      });
    }
    if (password.length < 4) {
      return res.status(400).send({
        errorMessage: '패스워드는 4자 이상이어야 합니다.',
      });
    }
    const nickSchema = Joi.string().alphanum().min(3).required();

    try {
      Joi.assert(nickname, nickSchema);
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        errorMessage: '닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로 구성되어야 합니다.',
      });
    }

    // 서비스 계층에 구현된 signupMember 로직을 실행합니다.
    const signupMember = await this.signupService.signupMember(nickname, password);

    // 전달되는게 중복에러메세지이면 signupMember의 키가 message가 아니라 errorMessage 일 것이다.
    if (signupMember.message) res.status(201).send(signupMember);
    else res.status(400).send(signupMember);
  };
}

module.exports = SignupController;
