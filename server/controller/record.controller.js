import RecordService from "../service/record.service.js";
const recordService = new RecordService();

class RecordController {
  async createRecord(req, res, next) {
    try {
      const {
        id_client,
        id_services, 
        day, 
        time,
  } = req.body;
      await recordService.createRecord(
        id_client,
        id_services, 
        day, 
        time,
      );
      res.status(200).json({ message: 'Запись успешно создана!' }); 
    } catch (e) {
      next(e);
    }
  }  
  async getrecord(req, res, next) {
        try {
          const response = await recordService.getRecord();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
    async get2record(req, res, next) {
      try {
        const response = await recordService.get2Record();
        return res.json(response.rows);
      } catch (e) {
        next(e);
      }
  }
    async getRecordById(req, res, next) {
      try {
          const { id } = req.params;
          const response = await recordService.getRecordById(id);
          return res.json(response);
      } catch (e) {
          next(e);
      }
  }
  async addRecord(req, res, next) {
    try {
      const recordData = req.body;
      const response = await recordService.addRecord(recordData);
      res.status(200).json({ message: 'Запись добавлена' }); 
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async updateRecord(req, res, next) {
    try {
      const { id } = req.params;
      const recordData = req.body;
      const response = await recordService.updateRecord(id, recordData);
      res.status(200).json({ message: 'Запись обновлена' }); 
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteRecord(req, res, next) {
    try {
      const { id } = req.params;
      const response = await recordService.deleteRecord(id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
  async getRecordbyService(req, res, next) {
    const id = req.params.id;
    try {
      const response = await recordService.getRecordbyService(id);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async getRecordbyDay(req, res, next) {
    const day = req.params.id;
    try {
      const response = await recordService.getRecordbyDay(day);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async getRecordbyCategory(req, res, next) {
    const id = req.params.id;
    try {
      const response = await recordService.getRecordbyCategory(id);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async getRecordbyTime(req, res, next) {
    const time = req.params.id;
    try {
      const response = await recordService.getRecordbytime(time);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async getRevenueByMonth(req, res, next) {
    try {
        const response = await recordService.getRevenueByMonth();
        return res.json(response); 
    } catch (e) {
        next(e);
    }
}
  async checkRecordCompleteness(req, res, next) {
    try {
      const response = await recordService.checkRecordCompleteness();
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
  async getRecordbyClient(req, res, next) {
    const id = req.params.id;
    try {
      const response = await recordService.getRecordbyСlient(id);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async delClient(req, res, next) {
    try {
      const id = req.params.id;
      await recordService.delClient(id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
}
export default RecordController