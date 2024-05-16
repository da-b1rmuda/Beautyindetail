import client from "../db.js";

class MasterService {
  async getMaster() {
    const response = await client.query(
      `
      SELECT masters.*, categore_services.name AS category_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.id as category_id
      FROM masters
      JOIN categore_services ON masters.idcategoryservice = categore_services.id
        `
    );
    return response;
  }
  async getMasterById(id) {
    const response = await client.query(
      `
      SELECT masters.*, categore_services.name AS category_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name
      FROM masters
      JOIN categore_services ON masters.idcategoryservice = categore_services.id
      WHERE masters.id = $1
        `,
        [id]
    );
    return response.rows[0];
  }
  async getMasterByCategory(categoryId) {
    const response = await client.query(
      `
      SELECT masters.*, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name
      FROM masters
      JOIN categore_services ON masters.idcategoryservice = categore_services.id
      WHERE categore_services.id = $1`
      ,
      [categoryId]
    );
    return response;
  }
  async addMaster(masterData) {
    const response = await client.query(
      `
      INSERT INTO masters (name, lastname, patronymic, idcategoryservice, phone, address, 
      work_experience, description, date_of_birth)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `
      ,
      [masterData.name, masterData.lastname, masterData.patronymic, masterData.idcategoryservice, masterData.phone,
       masterData.address, masterData.work_experience, masterData.description, masterData.date_of_birth]
    );
    return response.rows[0];
}

async updateMaster(id, masterData) {
    const response = await client.query(
      `
      UPDATE masters
      SET name = $1, lastname = $2, patronymic = $3, idcategoryservice = $4, phone = $5, address = $6, 
      work_experience = $7, description = $8, date_of_birth = $9
      WHERE id = $10
      `
      ,
      [masterData.name, masterData.lastname, masterData.patronymic, masterData.idcategoryservice, masterData.phone,
        masterData.address, masterData.work_experience, masterData.description, masterData.date_of_birth, id]
    );
    return response.rows[0];
}

async deleteMaster(id) {
    const response = await client.query(
      `
      DELETE FROM masters
      WHERE id = $1
      `
      ,
      [id]
    );
    return response.rows[0];
}
}

export default MasterService;

