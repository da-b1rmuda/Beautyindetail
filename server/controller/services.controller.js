import ServicesService from "../service/services.service.js";
const servicesService = new ServicesService();

class ServicesController {
    async getservices(req, res, next) {
        try {
          const response = await servicesService.getServices();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
    async getServicesById(req, res, next) {
      try {
        const { id } = req.params;
        const response = await servicesService.getServicesById(id);
        return res.json(response);
      } catch (e) {
        next(e);
      }
  }
  async getServicesByCategory(req, res, next) {
    const categoryId = req.params.id;
    try {
      const response = await servicesService.getServicesByCategory(categoryId);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async addServices(req, res, next) {
    try {
      const data = req.body;
      const response = await servicesService.addServices(data);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async updateServices(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await servicesService.updateServices(id, data);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteServices(req, res, next) {
    try {
      const { id } = req.params;
      const response = await servicesService.deleteServices(id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}
export default ServicesController