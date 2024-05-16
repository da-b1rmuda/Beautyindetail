import VistitorService from "../service/visitor.service.js";
const visitorService = new VistitorService();

class VistitorController {
  async createVisitor(req, res, next) {
    try {
      const {
        lastname, 
        name, 
        patronymic, 
        phone, 
        dateofbirth, 
        email,
        login, 
        password,
      } = req.body;
  
      await visitorService.createVisitor(
        lastname, 
        name, 
        patronymic, 
        phone, 
        dateofbirth, 
        email,
        login, 
        password,
      );
  
      res.status(200).json({ message: 'Запись добавлена' }); 
    } catch (e) {
      next(e);
    }
  }
    async getvisitor(req, res, next) {
        try {
          const response = await visitorService.getVisitors();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
    async getVisitorById(req, res, next) {
      try {
          const { id } = req.params;
          const response = await visitorService.getVisitorById(id);
          return res.json(response);
      } catch (e) {
          next(e);
      }
  }
  async updateVisitor(req, res, next) {
    try {
        const {
            id,
            lastname,
            name,
            patronymic,
            phone,
            dateofbirth,
            login,
            password,
            email
        } = req.body;

        await visitorService.updateVisitor(id, lastname, name, patronymic, phone, dateofbirth, login, password,email);
        res.status(200).json({ message: 'Данные обновлены' });
    } catch (e) {
        next(e);
    }
}
async deleteVisitor(req, res, next) {
    try {
        const { id } = req.params;
        await visitorService.deleteVisitor(id);
        res.status(200).json({ message: 'Запись удалена' }); 
    } 
    catch (e) {
        next(e);
    }
}
async updatepasswordVisitor(req, res, next) {
  try {
      const {
          id,
          password,
      } = req.body;

      await visitorService.updatepasswordVisitor(id, password);
      res.status(200).json({ message: 'Данные обновлены' });
  } catch (e) {
      next(e);
  }
}
}
export default VistitorController