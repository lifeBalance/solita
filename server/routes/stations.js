import express from 'express'
import { db } from '../db/conn.js'

const router = express.Router()

router.get('/stations', getStations)

async function getStations(req, res) {
  const { page, search } = req.query
  const stationsPerPage = 20
  const query = {}
  if (search)
    query.Name = { $regex: new RegExp(search.toLowerCase()) }

  console.log('searching for ', search, ` (${typeof search})`) // testing

  const result = await db
    .collection('stations')
    .find(
      query,
      {
        projection: {
          Name: 1,
          Adress: 1,
          Kaupunki: 1
        },
      },
    )
    .skip(+page === 1 ? 0 : (+page - 1) * stationsPerPage)
    .limit(stationsPerPage)
    .toArray()
  console.log(result) // testing
  res.status(200).json(result)
}

export default router
