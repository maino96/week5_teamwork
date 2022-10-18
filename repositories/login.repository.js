// '../models'에서 가져오는 거라 이름이 Users인 것만 가져오기 위해 구조분해할당 사용
// 만약 '../models/users' 에서 require한다면 구조분해할당 해도 되고 안해도 되고...
const { Users } = require('../models');

class SignupRepository {
  findUser = async (nickname, password) => {
    // ORM인 Sequelize에서 Users 모델의 findOne 메소드를 사용해 일치하는 유저 찾기
    const user = await Users.findOne({ where: { nickname, password } });
    // 조건에 부합하는 유저가 있든 없든 결과를 user 변수에 담아서 리턴
    return user;
  };
}

module.exports = SignupRepository;
