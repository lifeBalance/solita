import express from 'express'
import { db } from '../db/conn.js'

const router = express.Router()

router.get('/stations', getStations)

async function getStations(req, res) {
  const result = await db
    .collection('stations')
    .find(
      {},
      {
        projection: {
          Name: 1,
          Adress: 1,
          Kaupunki: 1
        },
      },
    )
    .limit(100)
    .toArray()
  // console.log(result) // testing
  res.status(200).json(result)
}

export default router
