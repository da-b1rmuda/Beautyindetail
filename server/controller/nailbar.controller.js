import NailbarService from "../service/nailbar.service.js";
const nailbarService = new NailbarService();

class NailbarController {
    async getnailbar(req, res, next) {
        try {
          const response = await nailbarService.getNailbar();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
}
export default NailbarController