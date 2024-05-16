import client from "../db.js";

class ServicesService {
  async getServices() {
    const response = await client.query(
      `
      SELECT services.*, categore_services.name AS category_name 
      FROM services 
      JOIN categore_services ON services.idcategoreservices = categore_services.id
        `
    );
    return response;
  }
  async getServicesById(id) {
    const response = await client.query(
      `
      SELECT services.*, categore_services.name AS category_name 
      FROM services 
      JOIN categore_services ON services.idcategoreservices = categore_services.id
      Where services.id = $1
        `,
        [id]
    );
    return response.rows[0];
  }
  async getServicesByCategory(categoryId) {
    const response = await client.query(
      `
      SELECT services.*
      FROM services
      JOIN categore_services ON services.idcategoreservices = categore_services.id
      WHERE categore_services.id = $1`
      ,
      [categoryId]
    );
    return response;
  }
  async addServices(data) {
    const response = await client.query(
      
        `INSERT INTO services (name, time, price, idcategoreservices)
        VALUES ($1, $2,$3, $4)
        `
      ,
      [data.name, data.time, data.price, data.idcategoreservices]
    );
    return response.rows[0];
  }

  async updateServices(id, data) {
    const response = await client.query(
      
        `UPDATE services 
        SET name = $1, time = $2, price = $3, idcategoreservices = $4
        WHERE id = $5
       `
      ,
      [data.name, data.time, data.price, data.idcategoreservices, id]
    );
    return response.rows[0];
  }

  async deleteServices(id) {
    const response = await client.query(
      'DELETE FROM services WHERE id = $1',
      [id]
    );
    return response.rows[0];
}
}

export default ServicesService;