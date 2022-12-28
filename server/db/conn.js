import { MongoClient } from 'mongodb'

const MONGO_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db

async function connectMongo() {
  try {
    const conn = await client.connect()
  
    db = conn.db(process.env.MONGO_INITDB_DATABASE)
  
    console.log('Connected successfully to MongoDB')
  } catch (error) {
    console.log('woops!', error)
  }
}

export { db, connectMongo}