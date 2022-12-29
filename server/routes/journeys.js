import express from 'express'
import { db } from '../db/conn.js'

const router = express.Router()

router.get('/journeys', getJourneys)

async function getJourneys(req, res) {
  const result = await db
    .collection('journeys')
    .find(
      {},
      {
        projection: {
          departureStationName: 1,
          returnStationName: 1,
          distance: 1,
          duration: 1,
        },
      },
    )
    .limit(100)
    .toArray()
  // console.log(result)   // testing
  res.status(200).json(result)
}

export default router
