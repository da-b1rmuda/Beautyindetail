import CategoryService from "../service/category.service.js";
const categoryService = new CategoryService();

class CategoryController {
    async getcategory(req, res, next) {
        try {
          const response = await categoryService.getCategory();
          return res.json(response.rows);
        } catch (e) {
          next(e);
        }
    }
    async getCategoryById(req, res, next) {
      try {
          const { id } = req.params;
          const response = await categoryService.getCategoryById(id);
          return res.json(response);
      } catch (e) {
          next(e);
      }
  }
  async addCategory(req, res, next) {
    try {
      const data = req.body;
      const response = await categoryService.addCategory(data);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await categoryService.updateCategory(id, data);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const response = await categoryService.deleteCategory(id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}
export default CategoryController