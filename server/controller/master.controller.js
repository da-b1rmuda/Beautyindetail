import MasterService from "../service/master.service.js";
const masterService = new MasterService();

class MasterController {
    async getmaster(req, res, next) {
        try {
          const response = await masterService.getMaster();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
    async getmasterById(req, res, next) {
      try {
          const { id } = req.params;
          const response = await masterService.getMasterById(id);
          return res.json(response);
      } catch (e) {
          next(e);
      }
  }
  async getMasterByCategory(req, res, next) {
    const categoryId = req.params.id;
    try {
      const response = await masterService.getMasterByCategory(categoryId);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async addMaster(req, res, next) {
    try {
      const masterData = req.body;
      const response = await masterService.addMaster(masterData);
      res.status(200).json({ message: 'Запись добавлена' }); 
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async updateMaster(req, res, next) {
    try {
      const { id } = req.params;
      const masterData = req.body;
      const response = await masterService.updateMaster(id, masterData);
      res.status(200).json({ message: 'Запись обновлена' }); 
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteMaster(req, res, next) {
    try {
      const { id } = req.params;
      const response = await masterService.deleteMaster(id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}
export default MasterController