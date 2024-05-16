import HairdresserService from "../service/hairdresser.service.js";
const hairdresserService = new HairdresserService();

class HairdresserController {
    async gethairdresser(req, res, next) {
        try {
          const response = await hairdresserService.getHairdresser();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
}
export default HairdresserController