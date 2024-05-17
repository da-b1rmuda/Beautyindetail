import * as dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()
// const USERNAME = 'postgres'
// const PASSWORD = 'password'
// const HOST = 'postgres'
// const DATABASE = 'Beauty_in_details'

const conStringPri = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
const Client = pg.Client
const client = new Client({ connectionString: conStringPri })
client.connect()

export default client
