import client from "../db.js";

class NailbarService {
  async getNailbar() {
    const response = await client.query(
      `
        select * from services where idcategoreservices=3
        `
    );
    return response;
  }
}

export default NailbarService;