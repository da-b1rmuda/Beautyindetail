import client from "../db.js";

class MakeupService {
  async getMakeup() {
    const response = await client.query(
      `
        select * from services where idcategoreservices=2
        `
    );
    return response;
  }
}

export default MakeupService;