import client from "../db.js";

class DepService {
  async getDep() {
    const response = await client.query(
      `
        select * from services where idcategoreservices=4
        `
    );
    return response;
  }
}

export default DepService;