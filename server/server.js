import express from 'express'
import { db, connectMongo } from './db/conn.js'
import journeysRoutes from './routes/journeys.js'
import stationsRoutes from './routes/stations.js'

const app = express()

// For testing initial db connection
app.get('/', async (req, res) => {
  const result = await db.collection('stations').findOne({ Nimi: 'Hanasaari'})
  
  console.log(`hitting mongo with ${JSON.stringify(result)}`)
  
  res.send(`hello from ${result.Namn}`)
})

app.use('/api', journeysRoutes)
app.use('/api', stationsRoutes)

try {
  // Connect to the Mongo database
  await connectMongo()
  
  // Only then start the server
  const port = 3000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
} catch (error) {
  console.log(`woops ${error}`);
}