import client from "../db.js";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;
  }

  static BadRequest(message) {
    return new ApiError(message, 400);
  }
}

class VisitorService {
  async getVisitors() {
    const response = await client.query(
      `
      select clients.*, users.login AS login, users.password AS password
      FROM clients
      LEFT JOIN users ON clients.id_user = users.id
        `
    );
    return response;
  }

  async checkIfLoginExists(login) {
    const response = await client.query(
      `select * from users where login = $1`,
      [login]
    );
    return response.rows.length > 0;
  }

  async createVisitor(lastname, name, patronymic, phone, dateofbirth, email, login, password) {
    const loginExists = await this.checkIfLoginExists(login);

    if (loginExists) {
      throw ApiError.BadRequest('Логин уже существует. Пожалуйста, выберите другой логин.');
    }

    if(password.length < 6) {
      throw ApiError.BadRequest('Пароль должен состоять как минимум из 6 символов.');
    }

    let id = Math.floor(Math.random() * 1000000); // Generate a random unique id
    let id_user = id;
    let id_c=id_user // Assign the same id to id_user
    await client.query(`insert into users (id, login, password) 
    values ($1, $2, $3)`,
    [id, login, password]);

    await client.query(`insert into clients (id, id_user, lastname, name, patronymic, phone, dateofbirth, email)
    values ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id_c, id_user, lastname, name, patronymic, phone, dateofbirth, email]);
  }
  async getVisitorById(id) {
    const response = await client.query(
        `
        SELECT clients.*, users.login AS login, users.password AS password, CONCAT(clients.lastname, ' ', clients.name, ' ', clients.patronymic) AS client_name
        FROM clients
        LEFT JOIN users ON clients.id_user = users.id
        WHERE clients.id = $1
        `,
        [id]
    );
    return response.rows[0]; // Вернуть только первую строку, так как id уникален
}

async updateVisitor(id, lastname, name, patronymic, phone, dateofbirth, login, password) {
  const loginExists = await this.checkIfLoginExists(login); // Проверка на существование логина

  if (loginExists) {
      throw new Error('Логин уже существует. Пожалуйста, выберите другой логин.');
  }

  if (password.length < 6) {
      throw new Error('Пароль должен состоять как минимум из 6 символов.');
  }

  await client.query(`UPDATE users SET login = $1, password = $2 WHERE id = $3`,
      [login, password, id]);

  await client.query(`UPDATE clients SET lastname = $1, name = $2, patronymic = $3, phone = $4, dateofbirth = $5, email = $6 WHERE id_user = $7`,
      [lastname, name, patronymic, phone, dateofbirth, email, id]);
}

async deleteVisitor(id) {
  await client.query(`delete from clients where id_user = $1`, [id]);
  await client.query(`delete from users where id = $1`, [id]);
}
async updatepasswordVisitor(id, password) {
  if (password.length < 6) {
    throw new Error('Пароль должен состоять как минимум из 6 символов.');
}
  await client.query(`UPDATE users SET password = $1 WHERE id = $2`,
      [password, id]);
}
}

export default VisitorService;