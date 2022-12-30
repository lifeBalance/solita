import express from 'express'
import { db } from '../db/conn.js'

const router = express.Router()

router.get('/journeys', getJourneys)

async function getJourneys(req, res) {
  const page = parseInt(req.query.page)
  const journeysPerPage = 10

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
    .skip(page === 1 ? 0 : (page - 1) * journeysPerPage)
    .limit(journeysPerPage)
    .toArray()
  // console.log(result[0], 'end')   // testing (why does it log it twice 🤔)
  res.status(200).json(result)
}

export default router
