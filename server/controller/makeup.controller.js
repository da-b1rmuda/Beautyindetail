import MakeupService from "../service/makeup.service.js";
const makeupService = new MakeupService();

class MakeupController {
    async getmakeup(req, res, next) {
        try {
          const response = await makeupService.getMakeup();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
}
export default MakeupController