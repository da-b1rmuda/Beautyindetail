import client from "../db.js";

class RecordService {
  async getRecord() {
    const response = await client.query(
      `
      SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone AS client_phone
FROM record
LEFT JOIN services ON record.id_services = services.id
LEFT JOIN masters ON record.id_masters = masters.id
LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
LEFT JOIN clients ON record.id_client = clients.id
WHERE record.day > NOW() AND (record.id_client IS NULL OR record.id_client = 0);
        `
    );
    return response;
  }
  async get2Record() {
    const response = await client.query(
      `
      SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone AS client_phone
FROM record
LEFT JOIN services ON record.id_services = services.id
LEFT JOIN masters ON record.id_masters = masters.id
LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
LEFT JOIN clients ON record.id_client = clients.id
        `
    );
    return response;
  }
  async createRecord(id_client, id_services, day, time) {
    await client.query(`
    update record set id_client = $1 where id_services = $2 and day = $3 and time = $4`, 
    [id_client, id_services, day, time]);
}
async getRecordById(id) {
  const response = await client.query(
    `
    SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone as client_phone, categore_services.id AS id_category_service
    FROM record
    LEFT JOIN services ON record.id_services = services.id
    LEFT JOIN masters ON record.id_masters = masters.id
    LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
    LEFT JOIN clients ON record.id_client = clients.id
    WHERE record.id = $1
    `,
    [id]
  );
  return response.rows[0];
}
async addRecord(recordData) {
  const response = await client.query(
    `
    INSERT INTO record (day, time, id_services, id_client, id_masters)
    VALUES ($1, $2, $3, $4, $5)
    `
    ,
    [recordData.day, recordData.time, recordData.id_services, recordData.id_client, recordData.id_masters]
  );
  return response.rows[0];
}

async updateRecord(id, recordData) {
  const response = await client.query(
    `
    UPDATE record
    SET day=$1, time=$2, id_services=$3, id_client=$4, id_masters=$5
    WHERE id = $6
    `
    ,
    [recordData.day, recordData.time, recordData.id_services, recordData.id_client, recordData.id_masters, id]
  );
  return response.rows[0];
}

async deleteRecord(id) {
  const response = await client.query(
    `
    DELETE FROM record
    WHERE id = $1
    `
    ,
    [id]
  );
  return response.rows[0];
}
async getRecordbyService(id) {
  const response = await client.query(
    `
    SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone as client_phone, categore_services.id AS id_category_service
    FROM record
    JOIN services ON record.id_services = services.id
    LEFT JOIN masters ON record.id_masters = masters.id
    LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
    LEFT JOIN clients ON record.id_client = clients.id
    WHERE services.id = $1 and record.day > NOW()` 
    ,
    [id]
  );
  return response;
}
async getRecordbyDay(day) {
  const response = await client.query(
    `
    SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone as client_phone, categore_services.id AS id_category_service
    FROM record
    JOIN services ON record.id_services = services.id
    LEFT JOIN masters ON record.id_masters = masters.id
    LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
    LEFT JOIN clients ON record.id_client = clients.id
    WHERE record.day = $1 and record.day > NOW()`
    ,
    [day]
  );
  return response;
}
async getRecordbyCategory(id) {
  const response = await client.query(
    `
    SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone as client_phone, categore_services.id AS id_category_service
    FROM record
    JOIN services ON record.id_services = services.id
    LEFT JOIN masters ON record.id_masters = masters.id
    LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
    LEFT JOIN clients ON record.id_client = clients.id
    WHERE categore_services.id = $1 and record.day > NOW()`
    ,
    [id]
  );
  return response;
}
async getRecordbytime(time) {
  const response = await client.query(
    `
    SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone as client_phone, categore_services.id AS id_category_service
    FROM record
    JOIN services ON record.id_services = services.id
    LEFT JOIN masters ON record.id_masters = masters.id
    LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
    LEFT JOIN clients ON record.id_client = clients.id
    WHERE record.time = $1 and record.day > NOW()`
    ,
    [time]
  );
  return response;
}
async getRevenueByMonth() {
  const response = await client.query(
      `
      SELECT EXTRACT(MONTH FROM day) AS month, SUM(services.price) AS total_revenue
      FROM record
      JOIN services ON record.id_services = services.id
      WHERE id_client IS NOT NULL
      GROUP BY EXTRACT(MONTH FROM day)
      ORDER BY EXTRACT(MONTH FROM day);
      `
  );
  return response.rows;
}

// Добавляем функцию для подсчета заполненности записей
async checkRecordCompleteness() {
  const response = await client.query(
      `
      SELECT COUNT(CASE WHEN id_client IS NOT NULL THEN 1 END) AS filled_records,
             COUNT(CASE WHEN id_client IS NULL THEN 1 END) AS empty_records
      FROM record
      WHERE record.day > NOW()
      `
  );
  return response.rows[0];
}
async getRecordbyСlient(id) {
  const response = await client.query(
    `
    SELECT record.*, services.name AS service_name, CONCAT(masters.lastname, ' ', masters.name, ' ', masters.patronymic) AS master_name, categore_services.name AS category_name, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name, clients.phone as client_phone, categore_services.id AS id_category_service
    FROM record
    JOIN services ON record.id_services = services.id
    LEFT JOIN masters ON record.id_masters = masters.id
    LEFT JOIN categore_services ON services.idcategoreservices = categore_services.id
    LEFT JOIN clients ON record.id_client = clients.id
    WHERE clients.id = $1` 
    ,
    [id]
  );
  return response;
}
async delClient(id) {
  await client.query(`
  update record set id_client = null where id = $1 and day > NOW()`, 
  [id]);
}
}

export default RecordService;