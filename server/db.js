import * as dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()
const USERNAME = 'postgres'
const PASSWORD = 'root'
const HOST = 'localhost'
const DATABASE = 'postgres'

const conStringPri = `postgres://${USERNAME}:${PASSWORD}@${HOST}/${DATABASE}`
const Client = pg.Client
const client = new Client({ connectionString: conStringPri })
client.connect()

export default client
