// 시퀄라이즈를 통해서 포스트 테이블에 접근하기 위해서 모델 모듈을 가지고 오는 것

const { Users } = require('../models');

class SignupRepository {
  signupMember = async (nickname, password) => {
    // ORM인 Sequelize에서 Users 모델의 findOne 메소드를 사용해 중복 여부 확인

    const existName = await Users.findOne({ where: { nickname } });
    if (existName) {
      return { errorMessage: '중복된 닉네임입니다.' };
    }

    // ORM인 Sequelize에서 Users 모델의 create 메소드를 사용해 데이터 생성 요청
    await Users.create({ nickname, password });
    return { message: '회원 가입에 성공하였습니다.' };
  };
}

module.exports = SignupRepository;
