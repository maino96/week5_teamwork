const { Router } = require('express');
const router = Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

// 토큰 여부 확인해서 로그인 된 유저인지 아닌지 확인하는 미들웨어 추가하기!

router.post('/', loginController.login);

module.exports = router;
