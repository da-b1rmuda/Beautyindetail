import client from "../db.js";

class HairdresserService {
  async getHairdresser() {
    const response = await client.query(
      `
        select * from services where idcategoreservices=1
        `
    );
    return response;
  }
}

export default HairdresserService;