import DepService from "../service/dep.service.js";
const depService = new DepService();

class DepController {
    async getdep(req, res, next) {
        try {
          const response = await depService.getDep();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
}
export default DepController