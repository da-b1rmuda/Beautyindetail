import UserService from "../service/user.service.js";
const userService = new UserService();

class UserController {
    async Login(req, res, next){
        try{
            const {login, password} = req.body;
            const response = await userService.loginuser(login, password);
            return res.json(response.rows)
        }catch (e) {
            next(e);
          }
    }
    async getusers(req, res, next) {
        try {
          const response = await userService.getUsers();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
    async emailUsers(req, res, next) {
      try {
          const { email } = req.params;
          const response = await userService.emailUsers(email);
          return res.json(response);
      } catch (e) {
          next(e);
      }
  }
  async  emailSending(req, res, next) {
    try {
        const { email } = req.params;
        const response = await userService.sendRecoveryCodeByEmail(email);
        return res.json(response);
    } catch (e) {
        next(e);
    }
}

}
export default UserController
