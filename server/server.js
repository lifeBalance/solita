import express from 'express'
import { db, connectMongo } from './db/conn.js'
import journeysRoutes from './routes/journeys.js'
import stationsRoutes from './routes/stations.js'

const app = express()

// Serve the React bundled app
app.use(express.static('dist'))

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