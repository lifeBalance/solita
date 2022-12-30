import express from 'express'
import { db } from '../db/conn.js'

const router = express.Router()

router.get('/stations', getStations)

async function getStations(req, res) {
  const page = parseInt(req.query.page)
  const stationsPerPage = 20
  // console.log('requested page',page) // testing

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
    .skip(page === 1 ? 0 : (page - 1) * stationsPerPage)
    .limit(stationsPerPage)
    .toArray()
  // console.log(result) // testing
  res.status(200).json(result)
}

export default router
